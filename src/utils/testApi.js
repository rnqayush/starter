import { apiRequest } from '../services/apiClient';
import { API_ENDPOINTS } from '../constants/api';

// Test function to verify API connection
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    const response = await apiRequest.get(API_ENDPOINTS.TEST.PING);
    console.log('API Response:', response.data);
    return {
      success: true,
      message: 'API connection successful',
      data: response.data
    };
  } catch (error) {
    console.error('API Connection Error:', error);
    return {
      success: false,
      message: error.message || 'API connection failed',
      error
    };
  }
};

// Test authentication endpoints
export const testAuthEndpoints = async () => {
  try {
    console.log('Testing authentication endpoints...');
    
    // Test registration
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'customer'
    };
    
    console.log('Testing user registration...');
    // Note: This is just for testing - in real app, we'd use the auth service
    const response = await apiRequest.post(API_ENDPOINTS.AUTH.REGISTER, testUser);
    console.log('Registration Response:', response.data);
    
    return {
      success: true,
      message: 'Authentication endpoints working',
      data: response.data
    };
  } catch (error) {
    console.error('Auth Test Error:', error);
    return {
      success: false,
      message: error.message || 'Authentication test failed',
      error
    };
  }
};

