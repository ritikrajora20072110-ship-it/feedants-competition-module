const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Competition = require('../src/models/Competition');
const User = require('../src/models/User');

beforeAll(async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/feedants_test_db';
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURI);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Concurrency & Data Consistency Stress Tests', () => {
  it('should prevent overbooking when 25 users concurrently race for 5 spots', async () => {
    // Create a competition with exactly 5 capacity
    const comp = await Competition.create({
      title: 'Limited Flash Dance',
      slug: `flash-dance-${Date.now()}`,
      category: 'Dance',
      tags: ['Flash', 'Exclusive'],
      prizePool: 500,
      entryFee: 50,
      maxParticipants: 5,
      currentParticipants: 0,
      judge: {
        name: 'Judge Test',
        title: 'Dance Lead',
        experience: '10 yrs',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      },
      dates: {
        registrationStart: new Date(Date.now() - 10000),
        registrationEnd: new Date(Date.now() + 100000),
        submissionStart: new Date(Date.now() - 5000),
        submissionEnd: new Date(Date.now() + 200000),
        resultDate: new Date(Date.now() + 300000),
      },
      rewards: [{ rank: 1, title: '1st', amount: 500 }],
    });

    // Create 25 unique users
    const users = await Promise.all(
      Array.from({ length: 25 }).map((_, i) =>
        User.create({
          name: `Concurrent User ${i}`,
          email: `concurrent_${Date.now()}_${i}@feedants.com`,
        })
      )
    );

    // Fire all 25 registration requests concurrently at the same time
    const registrationPromises = users.map((user, i) =>
      request(app)
        .post(`/api/competitions/${comp._id}/register`)
        .send({
          userId: user._id.toString(),
          paymentId: `pay_concurrent_${i}_${Date.now()}`,
        })
    );

    const responses = await Promise.all(registrationPromises);

    const successfulBookings = responses.filter((res) => res.status === 200);
    const rejectedBookings = responses.filter((res) => res.status === 409);

    // Exactly 5 must succeed, 20 must be rejected due to SPOTS_FULL
    expect(successfulBookings.length).toBe(5);
    expect(rejectedBookings.length).toBe(20);

    // Verify DB state consistency
    const finalComp = await Competition.findById(comp._id);
    expect(finalComp.currentParticipants).toBe(5);
  });
});
