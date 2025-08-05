const User = require('../models/User');
const JWTUtils = require('../utils/jwt');
const bcrypt = require('bcryptjs');

class AuthController {
  // Register user
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Name, email, and password are required'
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'User with this email already exists'
        });
      }

      // Create user
      const user = new User({
        name,
        email: email.toLowerCase(),
        password,
        isVerified: true // For demo purposes, auto-verify
      });

      await user.save();

      // Generate tokens
      const { accessToken, refreshToken } = JWTUtils.generateTokens({
        userId: user._id,
        email: user.email,
        role: user.role
      });

      // Store refresh token
      user.refreshTokens.push({ token: refreshToken });
      await user.save();

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: {
          user: user.toJSON(),
          token: accessToken,
          refreshToken
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Registration failed'
      });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Email and password are required'
        });
      }

      // Find user
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      // Generate tokens
      const { accessToken, refreshToken } = JWTUtils.generateTokens({
        userId: user._id,
        email: user.email,
        role: user.role
      });

      // Store refresh token
      user.refreshTokens.push({ token: refreshToken });
      await user.save();

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: user.toJSON(),
          token: accessToken,
          refreshToken
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Login failed'
      });
    }
  }

  // Logout user
  static async logout(req, res) {
    try {
      const authHeader = req.headers.authorization;
      const token = JWTUtils.extractTokenFromHeader(authHeader);

      if (token) {
        // Decode token to get user ID
        try {
          const decoded = JWTUtils.verifyAccessToken(token);
          const user = await User.findById(decoded.userId);
          
          if (user) {
            // Remove all refresh tokens (logout from all devices)
            user.refreshTokens = [];
            await user.save();
          }
        } catch (error) {
          // Token might be expired, but that's ok for logout
        }
      }

      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Logout failed'
      });
    }
  }

  // Refresh token
  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          status: 'error',
          message: 'Refresh token is required'
        });
      }

      // Verify refresh token
      const decoded = JWTUtils.verifyRefreshToken(refreshToken);
      
      // Find user and check if refresh token exists
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid refresh token'
        });
      }

      const tokenExists = user.refreshTokens.some(t => t.token === refreshToken);
      if (!tokenExists) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid refresh token'
        });
      }

      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } = JWTUtils.generateTokens({
        userId: user._id,
        email: user.email,
        role: user.role
      });

      // Replace old refresh token with new one
      user.refreshTokens = user.refreshTokens.filter(t => t.token !== refreshToken);
      user.refreshTokens.push({ token: newRefreshToken });
      await user.save();

      res.status(200).json({
        status: 'success',
        message: 'Tokens refreshed successfully',
        data: {
          token: accessToken,
          refreshToken: newRefreshToken
        }
      });
    } catch (error) {
      console.error('Token refresh error:', error);
      res.status(401).json({
        status: 'error',
        message: 'Invalid refresh token'
      });
    }
  }

  // Get user profile
  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.userId).select('-password -refreshTokens');
      
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      res.status(200).json({
        status: 'success',
        data: user.toJSON()
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to get profile'
      });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      const { name, phone, avatar } = req.body;
      
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      // Update fields
      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (avatar) user.avatar = avatar;

      await user.save();

      res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: user.toJSON()
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update profile'
      });
    }
  }

  // Forgot password
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          status: 'error',
          message: 'Email is required'
        });
      }

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        // Don't reveal if user exists or not
        return res.status(200).json({
          status: 'success',
          message: 'If a user with that email exists, a password reset email has been sent'
        });
      }

      // Generate reset token
      const { token, hashedToken } = JWTUtils.generatePasswordResetToken();
      
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      await user.save();

      // In a real app, you'd send an email here
      console.log(`Password reset token for ${email}: ${token}`);

      res.status(200).json({
        status: 'success',
        message: 'Password reset email sent'
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to process password reset request'
      });
    }
  }

  // Reset password
  static async resetPassword(req, res) {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Token and new password are required'
        });
      }

      // Hash the token to compare with stored hash
      const hashedToken = JWTUtils.hashToken(token);
      
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid or expired reset token'
        });
      }

      // Update password
      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      user.refreshTokens = []; // Log out from all devices
      await user.save();

      res.status(200).json({
        status: 'success',
        message: 'Password reset successful'
      });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to reset password'
      });
    }
  }

  // Verify email (placeholder)
  static async verifyEmail(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          status: 'error',
          message: 'Verification token is required'
        });
      }

      // In a real app, you'd verify the token here
      res.status(200).json({
        status: 'success',
        message: 'Email verified successfully'
      });
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Email verification failed'
      });
    }
  }

  // Resend verification email (placeholder)
  static async resendVerification(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          status: 'error',
          message: 'Email is required'
        });
      }

      // In a real app, you'd resend the verification email here
      res.status(200).json({
        status: 'success',
        message: 'Verification email sent'
      });
    } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to send verification email'
      });
    }
  }
}

module.exports = AuthController;
