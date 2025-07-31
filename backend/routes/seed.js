const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const User = require('../models/User');
const Business = require('../models/Business');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

// Import seeder
const enhancedHotelSeeder = require('../seeds/enhancedHotelSeeder');

// Import middleware
const { protect, authorize } = require('../middleware/auth');

/**
 * @desc    Seed database with sample data
 * @route   POST /api/seed
 * @access  Public (in development) / Admin (in production)
 */
const seedDatabase = async (req, res) => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Run the enhanced hotel seeder
    await enhancedHotelSeeder();
    
    // Get counts for verification
    const userCount = await User.countDocuments();
    const businessCount = await Business.countDocuments();
    const hotelCount = await Hotel.countDocuments();
    const roomCount = await Room.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const reviewCount = await Review.countDocuments();
    
    console.log('✅ Database seeding completed successfully!');
    
    res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        users: userCount,
        businesses: businessCount,
        hotels: hotelCount,
        rooms: roomCount,
        bookings: bookingCount,
        reviews: reviewCount
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    res.status(500).json({
      success: false,
      message: 'Database seeding failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * @desc    Clear all data from database
 * @route   DELETE /api/seed/clear
 * @access  Admin only
 */
const clearDatabase = async (req, res) => {
  try {
    console.log('🗑️ Starting database cleanup...');
    
    // Clear all collections
    await Promise.all([
      User.deleteMany({}),
      Business.deleteMany({}),
      Hotel.deleteMany({}),
      Room.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({})
    ]);
    
    console.log('✅ Database cleared successfully!');
    
    res.status(200).json({
      success: true,
      message: 'Database cleared successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Database clearing failed:', error);
    res.status(500).json({
      success: false,
      message: 'Database clearing failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * @desc    Get database statistics
 * @route   GET /api/seed/stats
 * @access  Public
 */
const getDatabaseStats = async (req, res) => {
  try {
    const stats = await Promise.all([
      User.countDocuments(),
      Business.countDocuments(),
      Hotel.countDocuments(),
      Room.countDocuments(),
      Booking.countDocuments(),
      Review.countDocuments()
    ]);
    
    const [userCount, businessCount, hotelCount, roomCount, bookingCount, reviewCount] = stats;
    
    // Get sample data
    const sampleHotels = await Hotel.find({}).limit(3).select('name location.city');
    const sampleUsers = await User.find({}).limit(3).select('name email role');
    
    res.status(200).json({
      success: true,
      message: 'Database statistics retrieved successfully',
      data: {
        counts: {
          users: userCount,
          businesses: businessCount,
          hotels: hotelCount,
          rooms: roomCount,
          bookings: bookingCount,
          reviews: reviewCount
        },
        samples: {
          hotels: sampleHotels,
          users: sampleUsers
        },
        database: {
          name: mongoose.connection.name,
          readyState: mongoose.connection.readyState,
          host: mongoose.connection.host
        }
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Failed to get database stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve database statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Routes
if (process.env.NODE_ENV === 'development') {
  // In development, allow public access to seeding
  router.post('/', seedDatabase);
  router.delete('/clear', clearDatabase);
} else {
  // In production, require admin access
  router.post('/', protect, authorize('admin'), seedDatabase);
  router.delete('/clear', protect, authorize('admin'), clearDatabase);
}

// Stats endpoint is always public
router.get('/stats', getDatabaseStats);

module.exports = router;
