const jwt = require('jsonwebtoken');
const { User } = require('../models');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (exclude password)
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found',
        });
      }

      // Check if user is active
      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated',
        });
      }

      // Check if account is locked
      if (req.user.isLocked) {
        return res.status(423).json({
          success: false,
          message: 'Account is temporarily locked',
        });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);

      let message = 'Not authorized, token failed';

      if (error.name === 'JsonWebTokenError') {
        message = 'Not authorized, invalid token';
      } else if (error.name === 'TokenExpiredError') {
        message = 'Not authorized, token expired';
      }

      res.status(401).json({
        success: false,
        message,
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this resource`,
      });
    }

    next();
  };
};

// Middleware to check specific permissions
const checkPermission = permission => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    // Admin has all permissions
    if (req.user.role === 'admin' || req.user.permissions.includes('all')) {
      return next();
    }

    // Check if user has the required permission
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Permission '${permission}' required to access this resource`,
      });
    }

    next();
  };
};

// Middleware to allow users to access only their own data
const ownerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }

  const resourceUserId = req.params.id || req.params.userId;
  const isOwner = req.user._id.toString() === resourceUserId;
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this resource',
    });
  }

  next();
};

module.exports = {
  protect,
  authorize,
  checkPermission,
  ownerOrAdmin,
};
