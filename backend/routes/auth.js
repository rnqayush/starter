const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  verifyEmail,
  resendVerification
} = require('../controllers/authController');

const { protect, rateLimitSensitive } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', rateLimitSensitive(15 * 60 * 1000, 5), login); // 5 attempts per 15 minutes
router.post('/forgotpassword', rateLimitSensitive(15 * 60 * 1000, 3), forgotPassword); // 3 attempts per 15 minutes
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', rateLimitSensitive(5 * 60 * 1000, 3), resendVerification); // 3 attempts per 5 minutes

// Protected routes
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, rateLimitSensitive(15 * 60 * 1000, 3), updatePassword); // 3 attempts per 15 minutes

module.exports = router;

