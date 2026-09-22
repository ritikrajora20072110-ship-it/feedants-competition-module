const express = require('express');
const router = express.Router();
const seedDatabase = require('../scripts/seed');

router.post('/', async (req, res, next) => {
  try {
    const result = await seedDatabase();
    res.json({
      success: true,
      message: 'Database reseeded successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
