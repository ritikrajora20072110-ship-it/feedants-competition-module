const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');

// List all competitions
router.get('/', (req, res, next) => competitionController.getCompetitions(req, res, next));

// Get single competition by ID or slug
router.get('/:id', (req, res, next) => competitionController.getCompetitionDetails(req, res, next));

// Register for competition
router.post('/:id/register', (req, res, next) => competitionController.register(req, res, next));

// Submit entry for competition
router.post('/:id/submit', (req, res, next) => competitionController.submitEntry(req, res, next));

// Get competition submissions
router.get('/:id/submissions', (req, res, next) => competitionController.getSubmissions(req, res, next));

module.exports = router;
