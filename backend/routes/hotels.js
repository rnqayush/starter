const express = require('express');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Placeholder routes - to be implemented
router.get('/', optionalAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hotels route - coming soon'
  });
});

router.post('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Create hotel route - coming soon'
  });
});

module.exports = router;

