const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JWTUtils {
  // Generate access token
  static generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret_key', {
      expiresIn: process.env.JWT_EXPIRE || '24h',
    });
  }

  // Generate refresh token
  static generateRefreshToken(payload) {
    return jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_key',
      { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
    );
  }

  // Generate both tokens
  static generateTokens(payload) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  // Verify access token
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  // Verify refresh token
  static verifyRefreshToken(token) {
    try {
      return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_key'
      );
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Extract token from Authorization header
  static extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  // Generate random token for email verification, password reset, etc.
  static generateRandomToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Generate secure password reset token
  static generatePasswordResetToken() {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    return { token, hashedToken };
  }

  // Hash token for storage
  static hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  // Generate email verification token
  static generateEmailVerificationToken() {
    return crypto.randomBytes(20).toString('hex');
  }
}

module.exports = JWTUtils;
