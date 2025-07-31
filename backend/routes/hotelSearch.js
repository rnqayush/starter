const express = require('express');
const {
  searchHotels,
  checkHotelAvailability,
  getPopularHotels,
  getHotelRecommendations
} = require('../controllers/hotelSearchController');

const router = express.Router();

// @desc    Search hotels with filters
// @route   GET /api/hotels/search
// @access  Public
router.get('/search', searchHotels);

// @desc    Check hotel availability
// @route   GET /api/hotels/:id/availability
// @access  Public
router.get('/:id/availability', checkHotelAvailability);

// @desc    Get popular hotels
// @route   GET /api/hotels/popular
// @access  Public
router.get('/popular', getPopularHotels);

// @desc    Get hotel recommendations
// @route   GET /api/hotels/recommendations
// @access  Public
router.get('/recommendations', getHotelRecommendations);

module.exports = router;

