const express = require('express');
const { body, validationResult } = require('express-validator');
const { 
  getUserById, 
  getUsersByRole,
  getActiveUsers,
  getUsersByBusinessCategory,
  sanitizeUser,
  sanitizeUsers,
  users
} = require('../data/users');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { role, businessCategory, active } = req.query;
    let filteredUsers = users;

    // Filter by role
    if (role) {
      filteredUsers = getUsersByRole(role);
    }

    // Filter by business category
    if (businessCategory) {
      filteredUsers = getUsersByBusinessCategory(businessCategory);
    }

    // Filter by active status
    if (active === 'true') {
      filteredUsers = getActiveUsers();
    }

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users: sanitizeUsers(filteredUsers),
        total: filteredUsers.length,
        filters: {
          role: role || 'all',
          businessCategory: businessCategory || 'all',
          active: active || 'all'
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
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    // Users can only access their own data unless they're admin
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this user data'
      });
    }

    const user = getUserById(id);
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
        user: sanitizeUser(user)
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
router.put('/:id', protect, [
  body('firstName').optional().notEmpty().trim().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().trim().withMessage('Last name cannot be empty'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('address').optional().notEmpty().trim().withMessage('Address cannot be empty'),
  body('website').optional().isURL().withMessage('Please provide a valid website URL'),
  body('businessName').optional().notEmpty().trim().withMessage('Business name cannot be empty')
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

    // Users can only update their own data unless they're admin
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this user data'
      });
    }

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Only allow certain fields to be updated
    const allowedUpdates = [
      'firstName', 
      'lastName', 
      'phone', 
      'address', 
      'website', 
      'businessName'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key) && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      lastModified: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: {
        user: sanitizeUser(users[userIndex])
      }
    });

  } catch (error) {
    console.error('Update user error:', error);
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

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove user from array
    const deletedUser = users.splice(userIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {
        deletedUser: sanitizeUser(deletedUser)
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
// @route   GET /api/users/stats
// @access  Private/Admin
router.get('/admin/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = users.length;
    const activeUsers = getActiveUsers().length;
    const usersByRole = {
      admin: getUsersByRole('admin').length,
      business_owner: getUsersByRole('business_owner').length,
      customer: getUsersByRole('customer').length,
      demo: getUsersByRole('demo').length
    };

    const usersByCategory = {
      hotels: getUsersByBusinessCategory('hotels').length,
      ecommerce: getUsersByBusinessCategory('ecommerce').length,
      weddings: getUsersByBusinessCategory('weddings').length,
      automobiles: getUsersByBusinessCategory('automobiles').length,
      business: getUsersByBusinessCategory('business').length,
      services: getUsersByBusinessCategory('services').length,
      restaurants: getUsersByBusinessCategory('restaurants').length
    };

    res.status(200).json({
      success: true,
      message: 'User statistics retrieved successfully',
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        usersByRole,
        usersByCategory,
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

module.exports = router;
