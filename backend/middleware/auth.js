const JWTUtils = require('../utils/jwt');
const User = require('../models/User');

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = JWTUtils.extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access token required'
      });
    }

    // Verify token
    const decoded = JWTUtils.verifyAccessToken(token);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password -refreshTokens');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        status: 'error',
        message: 'Please verify your email before accessing this resource'
      });
    }

    // Add user to request object
    req.user = user;
    req.userId = user._id;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.message === 'Invalid access token' || error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid access token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Access token expired'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Authentication failed'
    });
  }
};

// Middleware to authenticate user (optional - doesn't fail if no token)
const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = JWTUtils.extractTokenFromHeader(authHeader);

    if (!token) {
      return next();
    }

    // Verify token
    const decoded = JWTUtils.verifyAccessToken(token);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password -refreshTokens');
    
    if (user && user.isVerified) {
      req.user = user;
      req.userId = user._id;
    }
    
    next();
  } catch (error) {
    // Don't fail the request, just continue without user
    next();
  }
};

// Middleware to check if user has specific role
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Middleware to check if user is admin
const adminOnly = authorize(['admin']);

// Middleware to check if user is vendor or admin
const vendorOrAdmin = authorize(['vendor', 'admin']);

module.exports = {
  authenticate,
  optionalAuthenticate,
  authorize,
  adminOnly,
  vendorOrAdmin
};
