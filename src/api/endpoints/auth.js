import httpClient from '../client/httpClient';

// Auth API endpoints
const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  RESEND_VERIFICATION: '/auth/resend-verification',
};

// Register user
export const registerUser = async userData => {
  try {
    const response = await httpClient.post(
      AUTH_ENDPOINTS.REGISTER,
      userData
    );

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
        message: response.data.message,
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
};

// Login user
export const loginUser = async credentials => {
  try {
    const response = await httpClient.post(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    );

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
        message: response.data.message,
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
};

// Logout user
export const logoutUser = async () => {
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
};

// Refresh auth token
export const refreshAuthToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await networkManager.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      refreshToken,
    });

    if (response.status === 'success' && response.data) {
      const { token, refreshToken: newRefreshToken } = response.data;

      // Update stored tokens
      if (token) {
        networkManager.setAuthToken(token);
      }
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      return {
        success: true,
        token,
        refreshToken: newRefreshToken,
      };
    }

    throw new Error(response.message || 'Token refresh failed');
  } catch (error) {
    console.error('Token refresh error:', error);

    // Clear tokens if refresh fails
    networkManager.removeAuthToken();

    return {
      success: false,
      error: error.message || 'Token refresh failed',
    };
  }
};

// Forgot password
export const forgotPassword = async email => {
  try {
    const response = await networkManager.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
      email,
    });

    return {
      success: true,
      message: response.message || 'Password reset email sent',
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send password reset email',
    };
  }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await networkManager.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
      token,
      password: newPassword,
    });

    return {
      success: true,
      message: response.message || 'Password reset successful',
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      success: false,
      error: error.message || 'Password reset failed',
    };
  }
};

// Verify email
export const verifyEmail = async token => {
  try {
    const response = await networkManager.post(AUTH_ENDPOINTS.VERIFY_EMAIL, {
      token,
    });

    return {
      success: true,
      message: response.message || 'Email verified successfully',
    };
  } catch (error) {
    console.error('Email verification error:', error);
    return {
      success: false,
      error: error.message || 'Email verification failed',
    };
  }
};

// Resend verification email
export const resendVerificationEmail = async email => {
  try {
    const response = await networkManager.post(
      AUTH_ENDPOINTS.RESEND_VERIFICATION,
      { email }
    );

    return {
      success: true,
      message: response.message || 'Verification email sent',
    };
  } catch (error) {
    console.error('Resend verification error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send verification email',
    };
  }
};
