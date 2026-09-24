const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Competition = require('../models/Competition');
const Review = require('../models/Review');
const User = require('../models/User');
const Registration = require('../models/Registration');
const Submission = require('../models/Submission');
const { seedCompetitions, seedReviews } = require('./seedData');

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/feedants_db';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURI);
    }

    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      Competition.deleteMany({}),
      Review.deleteMany({}),
      User.deleteMany({}),
      Registration.deleteMany({}),
      Submission.deleteMany({}),
    ]);

    console.log('[Seed] Inserting default user...');
    const demoUser = await User.create({
      name: 'Riya Sharma',
      email: 'riya.sharma@feedants.com',
      phone: '+91 98765 43210',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      referralCode: 'riya123',
    });

    console.log('[Seed] Inserting competitions...');
    const insertedCompetitions = await Competition.insertMany(seedCompetitions);

    console.log('[Seed] Inserting reviews...');
    await Review.insertMany(seedReviews);

    // Create 1 active registration for another participant to match design (1 / 20 Booked, 19 spots left)
    const primaryComp = insertedCompetitions[0];
    const existingParticipant = await User.create({
      name: 'Pooja Hegde',
      email: 'pooja.hegde@feedants.com',
      phone: '+91 98765 11111',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    });

    await Registration.create({
      userId: existingParticipant._id,
      competitionId: primaryComp._id,
      paymentId: 'pay_feedants_init_001',
      amountPaid: 50,
      status: 'CONFIRMED',
      paymentGateway: 'Razorpay',
    });

    console.log('[Seed] Database successfully seeded with full-stack Feedants data!');
    return {
      success: true,
      competitions: insertedCompetitions.length,
      demoUserId: demoUser._id,
      primaryCompetitionId: primaryComp._id,
    };
  } catch (error) {
    console.error('[Seed Error]:', error);
    throw error;
  }
};

if (require.main === module) {
  seedDatabase()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = seedDatabase;
