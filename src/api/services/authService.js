// Authentication service
// Handles all authentication-related API calls

import httpClient from '../client/httpClient';
import { AUTH_ENDPOINTS } from '../config/endpoints';
import { SUCCESS_MESSAGES } from '../config/config';

class AuthService {
  // Register user
  async register(userData) {
    try {
      const response = await httpClient.post(AUTH_ENDPOINTS.REGISTER, userData);

      // Handle successful registration response
      if (response.data?.status === 'success' && response.data?.data) {
        const { user, token, refreshToken } = response.data.data;

        // Store tokens
        if (token) {
          httpClient.setAuthToken(token);
        }
        if (refreshToken) {
          httpClient.setRefreshToken(refreshToken);
        }

        return {
          success: true,
          user,
          token,
          refreshToken,
          message: response.data.message || SUCCESS_MESSAGES.OPERATION_SUCCESS,
        };
      }

      throw new Error(response.data?.message || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await httpClient.post(AUTH_ENDPOINTS.LOGIN, credentials);

      // Handle successful login response
      if (response.data?.status === 'success' && response.data?.data) {
        const { user, token, refreshToken } = response.data.data;

        // Store tokens
        if (token) {
          httpClient.setAuthToken(token);
        }
        if (refreshToken) {
          httpClient.setRefreshToken(refreshToken);
        }

        return {
          success: true,
          user,
          token,
          refreshToken,
          message: response.data.message || 'Login successful',
        };
      }

      throw new Error(response.data?.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  }

  // Logout user
  async logout() {
    try {
      await httpClient.post(AUTH_ENDPOINTS.LOGOUT);

      // Clear stored tokens
      httpClient.clearAuth();

      return {
        success: true,
        message: 'Logged out successfully',
      };
    } catch (error) {
      console.error('Logout error:', error);

      // Clear tokens even if API call fails
      httpClient.clearAuth();

      return {
        success: true,
        message: 'Logged out locally',
      };
    }
  }

  // Refresh auth token
  async refreshToken() {
    try {
      const refreshToken = httpClient.getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await httpClient.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
        refreshToken,
      });

      if (response.data?.status === 'success' && response.data?.data) {
        const { token, refreshToken: newRefreshToken } = response.data.data;

        // Update stored tokens
        if (token) {
          httpClient.setAuthToken(token);
        }
        if (newRefreshToken) {
          httpClient.setRefreshToken(newRefreshToken);
        }

        return {
          success: true,
          token,
          refreshToken: newRefreshToken,
        };
      }

      throw new Error(response.data?.message || 'Token refresh failed');
    } catch (error) {
      console.error('Token refresh error:', error);

      // Clear tokens if refresh fails
      httpClient.clearAuth();

      return {
        success: false,
        error: error.message || 'Token refresh failed',
      };
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await httpClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
        email,
      });

      return {
        success: true,
        message: response.data?.message || 'Password reset email sent',
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send password reset email',
      };
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await httpClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
        token,
        password: newPassword,
      });

      return {
        success: true,
        message: response.data?.message || 'Password reset successful',
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        error: error.message || 'Password reset failed',
      };
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await httpClient.post(AUTH_ENDPOINTS.VERIFY_EMAIL, {
        token,
      });

      return {
        success: true,
        message: response.data?.message || 'Email verified successfully',
      };
    } catch (error) {
      console.error('Email verification error:', error);
      return {
        success: false,
        error: error.message || 'Email verification failed',
      };
    }
  }

  // Resend verification email
  async resendVerificationEmail(email) {
    try {
      const response = await httpClient.post(
        AUTH_ENDPOINTS.RESEND_VERIFICATION,
        { email }
      );

      return {
        success: true,
        message: response.data?.message || 'Verification email sent',
      };
    } catch (error) {
      console.error('Resend verification error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send verification email',
      };
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await httpClient.get(AUTH_ENDPOINTS.PROFILE);

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          user: response.data.data,
        };
      }

      throw new Error(response.data?.message || 'Failed to get profile');
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get profile',
      };
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await httpClient.put(
        AUTH_ENDPOINTS.PROFILE,
        profileData
      );

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          user: response.data.data,
          message: response.data.message || 'Profile updated successfully',
        };
      }

      throw new Error(response.data?.message || 'Failed to update profile');
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        error: error.message || 'Failed to update profile',
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!httpClient.getAuthToken();
  }

  // Get current auth token
  getToken() {
    return httpClient.getAuthToken();
  }

  // Get current user from localStorage
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Set current user in localStorage
  setCurrentUser(user) {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  }
}

// Create and export singleton instance
const authService = new AuthService();

export { AuthService };
export default authService;
