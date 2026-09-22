const competitionService = require('../services/competitionService');
const User = require('../models/User');

class CompetitionController {
  /**
   * List all competitions
   */
  async getCompetitions(req, res, next) {
    try {
      const competitions = await competitionService.getAllCompetitions();
      res.json({
        success: true,
        count: competitions.length,
        data: competitions,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get single competition details with user state
   */
  async getCompetitionDetails(req, res, next) {
    try {
      const { id } = req.params;
      let userId = req.query.userId || req.headers['x-user-id'];

      // If no user ID provided, default to demo user for seamless preview
      if (!userId) {
        const demoUser = await User.findOne();
        if (demoUser) {
          userId = demoUser._id.toString();
        }
      }

      const result = await competitionService.getCompetitionByIdOrSlug(id, userId);

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Register for competition (concurrency-safe)
   */
  async register(req, res, next) {
    try {
      const { id } = req.params;
      let { userId, paymentId, paymentGateway } = req.body;

      if (!userId) {
        let demoUser = await User.findOne();
        if (!demoUser) {
          demoUser = await User.create({
            name: 'Demo Participant',
            email: `demo_${Date.now()}@feedants.com`,
          });
        }
        userId = demoUser._id;
      }

      const result = await competitionService.registerUser({
        competitionId: id,
        userId,
        paymentId,
        paymentGateway,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Submit entry for competition
   */
  async submitEntry(req, res, next) {
    try {
      const { id } = req.params;
      let { userId, title, mediaUrl, notes } = req.body;

      if (!mediaUrl) {
        return res.status(400).json({
          success: false,
          error: 'mediaUrl is required for submission',
        });
      }

      if (!userId) {
        const demoUser = await User.findOne();
        userId = demoUser ? demoUser._id : null;
      }

      const result = await competitionService.submitEntry({
        competitionId: id,
        userId,
        title,
        mediaUrl,
        notes,
      });

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get submissions for a competition
   */
  async getSubmissions(req, res, next) {
    try {
      const { id } = req.params;
      const submissions = await competitionService.getSubmissions(id);
      res.json({
        success: true,
        count: submissions.length,
        data: submissions,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CompetitionController();
