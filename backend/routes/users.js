const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { User } = require('../models');
const { protect, authorize, ownerOrAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('role').optional().isIn(['admin', 'business_owner', 'customer', 'demo']).withMessage('Invalid role'),
  query('businessCategory').optional().isIn(['hotels', 'ecommerce', 'weddings', 'automobiles', 'business', 'services', 'restaurants', 'other']).withMessage('Invalid business category'),
  query('active').optional().isBoolean().withMessage('Active must be true or false'),
  query('search').optional().isLength({ min: 2 }).withMessage('Search term must be at least 2 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { 
      page = 1, 
      limit = 10, 
      role, 
      businessCategory, 
      active, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (role) filter.role = role;
    if (businessCategory) filter.businessCategory = businessCategory;
    if (active !== undefined) filter.isActive = active === 'true';
    
    // Add search functionality
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const [users, totalUsers] = await Promise.all([
      User.find(filter)
        .sort(sort)
        .limit(parseInt(limit))
        .skip(skip)
        .lean(),
      User.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalUsers / parseInt(limit));

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalUsers,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        },
        filters: {
          role: role || 'all',
          businessCategory: businessCategory || 'all',
          active: active || 'all',
          search: search || ''
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching users'
    });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', protect, ownerOrAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: {
        user: user.toJSON()
      }
    });

  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching user'
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', protect, ownerOrAdmin, [
  body('firstName').optional().notEmpty().trim().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().trim().withMessage('Last name cannot be empty'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('address').optional().trim(),
  body('website').optional().isURL().withMessage('Please provide a valid website URL'),
  body('businessName').optional().trim(),
  body('businessCategory').optional().isIn(['hotels', 'ecommerce', 'weddings', 'automobiles', 'business', 'services', 'restaurants', 'other', '']).withMessage('Invalid business category')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Only allow certain fields to be updated by regular users
    const allowedUpdates = [
      'firstName', 
      'lastName', 
      'phone', 
      'address', 
      'website', 
      'businessName',
      'businessCategory'
    ];

    // Admin can update additional fields
    const adminOnlyUpdates = ['role', 'isActive', 'permissions'];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        if (req.body[key] !== undefined) {
          updates[key] = req.body[key];
        }
      } else if (adminOnlyUpdates.includes(key) && req.user.role === 'admin') {
        if (req.body[key] !== undefined) {
          updates[key] = req.body[key];
        }
      }
    });

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: {
        user: updatedUser.toJSON()
      }
    });

  } catch (error) {
    console.error('Update user error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error occurred while updating user'
    });
  }
});

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Prevent admin from deleting themselves
    if (id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Soft delete instead of hard delete (deactivate user)
    const deletedUser = await User.findByIdAndUpdate(
      id,
      { 
        $set: { 
          isActive: false,
          email: `deleted_${Date.now()}_${user.email}` // Prevent email conflicts
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully',
      data: {
        user: deletedUser.toJSON()
      }
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while deleting user'
    });
  }
});

// @desc    Get user statistics (admin only)
// @route   GET /api/users/admin/stats
// @access  Private/Admin
router.get('/admin/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const stats = await User.getStats();

    res.status(200).json({
      success: true,
      message: 'User statistics retrieved successfully',
      data: {
        ...stats,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching user statistics'
    });
  }
});

// @desc    Search users (admin only)
// @route   GET /api/users/search
// @access  Private/Admin
router.get('/search/:term', protect, authorize('admin'), [
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
], async (req, res) => {
  try {
    const { term } = req.params;
    const { limit = 10 } = req.query;

    if (term.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search term must be at least 2 characters long'
      });
    }

    const users = await User.find({
      $or: [
        { firstName: { $regex: term, $options: 'i' } },
        { lastName: { $regex: term, $options: 'i' } },
        { email: { $regex: term, $options: 'i' } },
        { businessName: { $regex: term, $options: 'i' } }
      ]
    })
    .limit(parseInt(limit))
    .sort({ createdAt: -1 })
    .lean();

    res.status(200).json({
      success: true,
      message: 'Search completed successfully',
      data: {
        users,
        searchTerm: term,
        resultsCount: users.length
      }
    });

  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while searching users'
    });
  }
});

module.exports = router;
