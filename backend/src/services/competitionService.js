const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const Submission = require('../models/Submission');
const User = require('../models/User');

class CompetitionService {
  /**
   * Get all active competitions
   */
  async getAllCompetitions() {
    const competitions = await Competition.find({ isActive: true }).sort({ createdAt: -1 });
    return competitions.map((comp) => {
      const dynamicState = comp.calculateDynamicState();
      return {
        ...comp.toObject(),
        dynamicState,
      };
    });
  }

  /**
   * Get competition by ID or slug with user-specific context
   */
  async getCompetitionByIdOrSlug(idOrSlug, userId = null) {
    let competition;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      competition = await Competition.findById(idOrSlug);
    } else {
      competition = await Competition.findOne({ slug: idOrSlug.toLowerCase() });
    }

    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }

    const dynamicState = competition.calculateDynamicState();

    let userState = {
      isRegistered: false,
      hasSubmitted: false,
      registration: null,
      submission: null,
    };

    if (userId) {
      const [registration, submission] = await Promise.all([
        Registration.findOne({ competitionId: competition._id, userId }),
        Submission.findOne({ competitionId: competition._id, userId }),
      ]);

      userState = {
        isRegistered: !!registration,
        hasSubmitted: !!submission,
        registration,
        submission,
      };
    }

    return {
      competition: competition.toObject(),
      dynamicState,
      userState,
    };
  }

  /**
   * Concurrency-Safe Atomic Registration
   * Ensures capacity limits cannot be exceeded even under extreme concurrency
   */
  async registerUser({ competitionId, userId, paymentId, paymentGateway = 'Razorpay' }) {
    // 1. Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // 2. Check if already registered
    const existingRegistration = await Registration.findOne({ competitionId, userId });
    if (existingRegistration) {
      const comp = await Competition.findById(competitionId);
      return {
        message: 'User is already registered for this competition',
        registration: existingRegistration,
        alreadyRegistered: true,
        competition: comp,
      };
    }

    // 3. Atomically reserve spot using conditional update
    // Only increment if currentParticipants < maxParticipants
    const updatedComp = await Competition.findOneAndUpdate(
      {
        _id: competitionId,
        isActive: true,
        $expr: { $lt: ['$currentParticipants', '$maxParticipants'] },
      },
      {
        $inc: { currentParticipants: 1 },
      },
      { new: true }
    );

    if (!updatedComp) {
      // Check whether competition exists or is actually full
      const checkComp = await Competition.findById(competitionId);
      if (!checkComp) {
        const error = new Error('Competition does not exist');
        error.statusCode = 404;
        throw error;
      }

      const error = new Error('Competition is full. No spots remaining.');
      error.statusCode = 409;
      error.code = 'SPOTS_FULL';
      throw error;
    }

    // 4. Create Registration document
    try {
      const registration = await Registration.create({
        userId,
        competitionId,
        paymentId: paymentId || `pay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        amountPaid: updatedComp.entryFee,
        currency: 'INR',
        status: 'CONFIRMED',
        paymentGateway,
      });

      return {
        message: 'Successfully registered for competition',
        registration,
        alreadyRegistered: false,
        spotsLeft: Math.max(0, updatedComp.maxParticipants - updatedComp.currentParticipants),
        currentParticipants: updatedComp.currentParticipants,
        maxParticipants: updatedComp.maxParticipants,
      };
    } catch (dbError) {
      // Rollback the spot reservation if registration insert fails
      await Competition.findByIdAndUpdate(competitionId, {
        $inc: { currentParticipants: -1 },
      });
      throw dbError;
    }
  }

  /**
   * Submit participant entry (requires registration)
   */
  async submitEntry({ competitionId, userId, title, mediaUrl, notes }) {
    // 1. Verify user registration
    const registration = await Registration.findOne({ competitionId, userId });
    if (!registration) {
      const error = new Error('You must be a paid/confirmed registered participant to upload a submission');
      error.statusCode = 403;
      throw error;
    }

    // 2. Check competition exists
    const competition = await Competition.findById(competitionId);
    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }

    // 3. Upsert submission
    const submission = await Submission.findOneAndUpdate(
      { competitionId, userId },
      {
        competitionId,
        userId,
        title: title || `${competition.title} Entry`,
        mediaUrl,
        notes: notes || '',
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
      { upsert: true, new: true, runValidators: true }
    );

    return {
      message: 'Submission uploaded successfully',
      submission,
    };
  }

  /**
   * Join competition waitlist when capacity is reached
   */
  async joinWaitlist({ competitionId, userId }) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const competition = await Competition.findById(competitionId);
    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if user is already on the waitlist
    const alreadyWaitlisted = competition.waitlist.some(
      (w) => w.userId.toString() === userId.toString()
    );

    if (alreadyWaitlisted) {
      return {
        message: 'You are already on the waitlist',
        position: competition.waitlist.findIndex((w) => w.userId.toString() === userId.toString()) + 1,
      };
    }

    competition.waitlist.push({ userId, joinedAt: new Date() });
    await competition.save();

    return {
      message: 'Successfully joined waitlist',
      position: competition.waitlist.length,
      waitlistCount: competition.waitlist.length,
    };
  }

  /**
   * Simulate multiple concurrent registration attempts
   * Used for demonstrating data consistency and race-condition prevention live
   */
  async simulateConcurrentRegistrations(competitionId, requestedSpots = 5) {
    const comp = await Competition.findById(competitionId);
    if (!comp) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }

    // Generate simulated concurrent users
    const simulatedUsers = await Promise.all(
      Array.from({ length: requestedSpots }).map((_, i) =>
        User.create({
          name: `Concurrent Dancer ${Math.floor(Math.random() * 1000)}`,
          email: `concurrent_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 6)}@test.com`,
        })
      )
    );

    // Fire all registrations concurrently
    const results = await Promise.allSettled(
      simulatedUsers.map((user) =>
        this.registerUser({
          competitionId,
          userId: user._id,
          paymentId: `sim_pay_${Date.now()}_${user._id}`,
        })
      )
    );

    const successful = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    const finalComp = await Competition.findById(competitionId);

    return {
      attempted: requestedSpots,
      successful,
      failed,
      currentParticipants: finalComp.currentParticipants,
      maxParticipants: finalComp.maxParticipants,
      spotsLeft: Math.max(0, finalComp.maxParticipants - finalComp.currentParticipants),
    };
  }

  /**
   * Get all submissions for a competition
   */
  async getSubmissions(competitionId) {
    const submissions = await Submission.find({ competitionId })
      .populate('userId', 'name avatarUrl')
      .sort({ submittedAt: -1 });
    return submissions;
  }
}

module.exports = new CompetitionService();
