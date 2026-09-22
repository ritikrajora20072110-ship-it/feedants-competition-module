const Review = require('../models/Review');

class ReviewController {
  async getReviews(req, res, next) {
    try {
      const reviews = await Review.find().sort({ createdAt: -1 }).limit(20);
      res.json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    } catch (err) {
      next(err);
    }
  }

  async createReview(req, res, next) {
    try {
      const review = await Review.create(req.body);
      res.status(201).json({
        success: true,
        data: review,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ReviewController();
