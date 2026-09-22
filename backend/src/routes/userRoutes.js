const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/me', (req, res, next) => userController.getCurrentUser(req, res, next));
router.get('/', (req, res, next) => userController.getAllUsers(req, res, next));

module.exports = router;
