import { store } from '../store';
import { apiSlice } from '../store/api/apiSlice';
import { authApi } from '../store/api/authApi';

// Test function to verify API connection using RTK Query
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    const result = await store.dispatch(apiSlice.endpoints.ping.initiate()).unwrap();
    console.log('API Response:', result);
    return {
      success: true,
      message: 'API connection successful',
      data: result
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

// Test authentication endpoints using RTK Query
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
    // Note: This is just for testing - in real app, we'd use the auth hooks
    const result = await store.dispatch(authApi.endpoints.register.initiate(testUser)).unwrap();
    console.log('Registration Response:', result);
    
    return {
      success: true,
      message: 'Authentication endpoints working',
      data: result
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
