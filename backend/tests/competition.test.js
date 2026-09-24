const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Competition = require('../src/models/Competition');
const User = require('../src/models/User');
const Registration = require('../src/models/Registration');
const seedDatabase = require('../src/scripts/seed');

beforeAll(async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/feedants_test_db';
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURI);
  }
  await seedDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Feedants Competition API Integration Tests', () => {
  let competitionId;
  let testUser;

  beforeAll(async () => {
    const comp = await Competition.findOne({ slug: 'feedants-classical-dance' });
    competitionId = comp._id.toString();

    testUser = await User.create({
      name: 'Test Candidate',
      email: `test_${Date.now()}@feedants.com`,
    });
  });

  it('GET /api/health - should return status OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  it('GET /api/competitions - should list all competitions with dynamic state', async () => {
    const res = await request(app).get('/api/competitions');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0]).toHaveProperty('dynamicState');
    expect(res.body.data[0]).toHaveProperty('spotsLeft');
  });

  it('GET /api/competitions/:id - should fetch competition details & user state', async () => {
    const res = await request(app)
      .get(`/api/competitions/${competitionId}`)
      .query({ userId: testUser._id.toString() });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.competition.title).toBe('Feedants Classical Dance');
    expect(res.body.data.userState.isRegistered).toBe(false);
  });

  it('POST /api/competitions/:id/register - should register user and decrement remaining spots', async () => {
    const res = await request(app)
      .post(`/api/competitions/${competitionId}/register`)
      .send({
        userId: testUser._id.toString(),
        paymentId: `pay_test_${Date.now()}`,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.registration.status).toBe('CONFIRMED');

    // Verify spot decrement
    const updatedComp = await Competition.findById(competitionId);
    expect(updatedComp.currentParticipants).toBe(2);
  });

  it('POST /api/competitions/:id/submit - should accept submission for registered user', async () => {
    const res = await request(app)
      .post(`/api/competitions/${competitionId}/submit`)
      .send({
        userId: testUser._id.toString(),
        title: 'Kathak Tarana Performance',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        notes: 'Performed in Teen Taal.',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.submission.title).toBe('Kathak Tarana Performance');
  });

  it('GET /api/competitions/:id/live-spots - should return fast spot metrics', async () => {
    const res = await request(app).get(`/api/competitions/${competitionId}/live-spots`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('spotsLeft');
    expect(res.body.data).toHaveProperty('serverTime');
    expect(res.body.data).toHaveProperty('lifecycle');
  });

  it('POST /api/competitions/:id/submit - should reject submission if user is not registered', async () => {
    const unregisteredUser = await User.create({
      name: 'Unregistered User',
      email: `unreg_${Date.now()}@feedants.com`,
    });

    const res = await request(app)
      .post(`/api/competitions/${competitionId}/submit`)
      .send({
        userId: unregisteredUser._id.toString(),
        title: 'Unauthorized Entry',
        mediaUrl: 'https://example.com/video.mp4',
      });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/competitions/:id/submit - should reject invalid media URL format', async () => {
    const res = await request(app)
      .post(`/api/competitions/${competitionId}/submit`)
      .send({
        userId: testUser._id.toString(),
        title: 'Bad URL Entry',
        mediaUrl: 'not-a-valid-url',
      });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('INVALID_URL_FORMAT');
  });

  it('POST /api/competitions/:id/waitlist - should allow joining waitlist', async () => {
    const waitlistUser = await User.create({
      name: 'Waitlist User',
      email: `waitlist_${Date.now()}@feedants.com`,
    });

    const res = await request(app)
      .post(`/api/competitions/${competitionId}/waitlist`)
      .send({
        userId: waitlistUser._id.toString(),
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message).toBe('Successfully joined waitlist');
  });

  it('GET /api/reviews - should return list of reviews', async () => {
    const res = await request(app).get('/api/reviews');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
