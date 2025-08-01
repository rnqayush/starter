const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class AuthAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to make HTTP requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store token if login successful
    if (response.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }

    return response;
  }

  // Register user
  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Store token if registration successful
    if (response.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }

    return response;
  }

  // Get current user
  async getCurrentUser() {
    return await this.request('/auth/me');
  }

  // Verify token
  async verifyToken() {
    return await this.request('/auth/verify', {
      method: 'POST',
    });
  }

  // Logout user
  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Even if API call fails, we should clear local storage
      console.warn(
        'Logout API call failed, but clearing local storage:',
        error
      );
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_timestamp');
    }
  }

  // Update user profile
  async updateProfile(userId, updates) {
    return await this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Check if user is authenticated (has valid token)
  isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Clear all auth data
  clearAuthData() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_timestamp');
  }
}

// Create and export a singleton instance
const authAPI = new AuthAPI();
export default authAPI;
