import { apiRequest, handleApiResponse, handleApiError, setAuthToken, clearAuthData } from './apiClient';
import { API_ENDPOINTS, STORAGE_KEYS, USER_ROLES } from '../constants/api';

class AuthService {
  // User Registration
  async register(userData) {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      const result = handleApiResponse(response);
      
      if (result.success && result.data.token) {
        this.setUserSession(result.data);
      }
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  // User Login
  async login(credentials) {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const result = handleApiResponse(response);
      
      if (result.success && result.data.token) {
        this.setUserSession(result.data);
      }
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Vendor Registration
  async registerVendor(vendorData) {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.VENDOR.REGISTER, vendorData);
      const result = handleApiResponse(response);
      
      if (result.success && result.data.token) {
        this.setUserSession(result.data);
      }
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Vendor Login
  async loginVendor(credentials) {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.VENDOR.LOGIN, credentials);
      const result = handleApiResponse(response);
      
      if (result.success && result.data.token) {
        this.setUserSession(result.data);
      }
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Admin Login
  async loginAdmin(credentials) {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.ADMIN.LOGIN, credentials);
      const result = handleApiResponse(response);
      
      if (result.success && result.data.token) {
        this.setUserSession(result.data);
      }
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get Current User
  async getCurrentUser() {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTH.ME);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Update User Profile
  async updateProfile(profileData) {
    try {
      const response = await apiRequest.put(API_ENDPOINTS.AUTH.PROFILE, profileData);
      const result = handleApiResponse(response);
      
      if (result.success && result.data.user) {
        // Update stored user data
        const currentUser = this.getCurrentUserFromStorage();
        const updatedUser = { ...currentUser, ...result.data.user };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      }
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Logout
  async logout() {
    try {
      // Call logout endpoint if available
      await apiRequest.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.warn('Logout endpoint failed:', error.message);
    } finally {
      // Always clear local data
      this.clearUserSession();
    }
  }

  // Set user session data
  setUserSession(data) {
    const { token, user } = data;
    
    if (token) {
      setAuthToken(token);
    }
    
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  }

  // Clear user session
  clearUserSession() {
    clearAuthData();
  }

  // Get current user from localStorage
  getCurrentUserFromStorage() {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getAuthToken();
    const user = this.getCurrentUserFromStorage();
    return !!(token && user);
  }

  // Check if user has specific role
  hasRole(role) {
    const user = this.getCurrentUserFromStorage();
    return user?.role === role;
  }

  // Check if user is customer
  isCustomer() {
    return this.hasRole(USER_ROLES.CUSTOMER);
  }

  // Check if user is vendor
  isVendor() {
    return this.hasRole(USER_ROLES.VENDOR);
  }

  // Check if user is admin
  isAdmin() {
    return this.hasRole(USER_ROLES.ADMIN);
  }

  // Check if user can access vendor features
  canAccessVendor() {
    return this.isVendor() || this.isAdmin();
  }

  // Check if user can access admin features
  canAccessAdmin() {
    return this.isAdmin();
  }

  // Get user display name
  getUserDisplayName() {
    const user = this.getCurrentUserFromStorage();
    if (!user) return 'Guest';
    
    return user.name || user.businessName || this.getNameFromEmail(user.email);
  }

  // Helper to extract name from email
  getNameFromEmail(email) {
    if (!email) return 'User';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Check if token is expired (basic check)
  isTokenExpired() {
    const token = this.getAuthToken();
    if (!token) return true;

    try {
      // Decode JWT token (basic implementation)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  // Refresh authentication state
  async refreshAuth() {
    if (this.isTokenExpired()) {
      this.clearUserSession();
      return { success: false, message: 'Session expired' };
    }

    try {
      const result = await this.getCurrentUser();
      if (result.success) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(result.data));
      }
      return result;
    } catch (error) {
      this.clearUserSession();
      return handleApiError(error);
    }
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;

