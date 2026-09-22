const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', (req, res, next) => reviewController.getReviews(req, res, next));
router.post('/', (req, res, next) => reviewController.createReview(req, res, next));

module.exports = router;
