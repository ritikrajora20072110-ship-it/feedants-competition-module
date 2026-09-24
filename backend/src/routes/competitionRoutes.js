const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const { validateObjectId, validateSubmission, validateRegistration } = require('../middleware/validator');

// List all competitions
router.get('/', (req, res, next) => competitionController.getCompetitions(req, res, next));

// Ultra-fast live spots polling
router.get('/:id/live-spots', validateObjectId('id'), (req, res, next) => competitionController.getLiveSpots(req, res, next));

// Get single competition by ID or slug
router.get('/:id', validateObjectId('id'), (req, res, next) => competitionController.getCompetitionDetails(req, res, next));

// Get user submission details
router.get('/:id/my-submission', validateObjectId('id'), (req, res, next) => competitionController.getMySubmission(req, res, next));

// Register for competition
router.post('/:id/register', validateObjectId('id'), validateRegistration, (req, res, next) => competitionController.register(req, res, next));

// Submit entry for competition
router.post('/:id/submit', validateObjectId('id'), validateSubmission, (req, res, next) => competitionController.submitEntry(req, res, next));

// Get competition submissions
router.get('/:id/submissions', validateObjectId('id'), (req, res, next) => competitionController.getSubmissions(req, res, next));

// Join waitlist when competition is full
router.post('/:id/waitlist', validateObjectId('id'), (req, res, next) => competitionController.joinWaitlist(req, res, next));

// Simulate concurrent bookings (Live consistency check)
router.post('/:id/simulate-concurrency', validateObjectId('id'), (req, res, next) => competitionController.simulateConcurrency(req, res, next));

module.exports = router;
