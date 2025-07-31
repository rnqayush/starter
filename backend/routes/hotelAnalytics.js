const express = require('express');
const {
  getHotelAnalytics,
  getBookingCalendar,
  getRevenueAnalytics
} = require('../controllers/hotelAnalyticsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get hotel analytics dashboard
// @route   GET /api/hotels/:id/analytics
// @access  Private (Hotel Owner)
router.get('/:id/analytics', protect, authorize('business_owner', 'admin'), getHotelAnalytics);

// @desc    Get booking calendar
// @route   GET /api/hotels/:id/calendar
// @access  Private (Hotel Owner)
router.get('/:id/calendar', protect, authorize('business_owner', 'admin'), getBookingCalendar);

// @desc    Get revenue analytics
// @route   GET /api/hotels/:id/revenue
// @access  Private (Hotel Owner)
router.get('/:id/revenue', protect, authorize('business_owner', 'admin'), getRevenueAnalytics);

module.exports = router;

