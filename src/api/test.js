// Test script for API integration
// This can be run in browser console to test the API endpoints

import { registerUser, loginUser } from './endpoints/auth';

// Test registration data
const testRegistrationData = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'testpassword123',
  phone: '1234567890',
  role: 'customer',
};

// Test login data
const testLoginData = {
  email: 'test@example.com',
  password: 'testpassword123',
};

// Function to test registration
export const testRegistration = async () => {
  console.log('Testing registration...');
  try {
    const result = await registerUser(testRegistrationData);
    console.log('Registration result:', result);
    return result;
  } catch (error) {
    console.error('Registration test failed:', error);
    return { success: false, error: error.message };
  }
};

// Function to test login
export const testLogin = async () => {
  console.log('Testing login...');
  try {
    const result = await loginUser(testLoginData);
    console.log('Login result:', result);
    return result;
  } catch (error) {
    console.error('Login test failed:', error);
    return { success: false, error: error.message };
  }
};

// Run tests in sequence
export const runAPITests = async () => {
  console.log('Starting API integration tests...');

  // Test registration
  const registrationResult = await testRegistration();

  if (registrationResult.success) {
    console.log('✅ Registration test passed');

    // Test login
    const loginResult = await testLogin();

    if (loginResult.success) {
      console.log('✅ Login test passed');
      console.log('🎉 All API tests passed!');
    } else {
      console.log('❌ Login test failed');
    }
  } else {
    console.log('❌ Registration test failed');
  }

  console.log('API integration tests completed.');
};

// Export for console usage
if (typeof window !== 'undefined') {
  window.testAPI = {
    testRegistration,
    testLogin,
    runAPITests,
  };
}
