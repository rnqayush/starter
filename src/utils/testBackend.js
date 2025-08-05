// Simple backend connectivity test
import httpClient from '../api/client/httpClient';

export const testBackendConnection = async () => {
  try {
    console.log('🔍 Testing backend connection...');

    const response = await httpClient.get('/health');

    if (response.data?.status === 'success') {
      console.log('✅ Backend is connected and running!');
      return { success: true, data: response.data };
    } else {
      console.log(
        '⚠️ Backend responded but with unexpected format:',
        response.data
      );
      return { success: false, error: 'Unexpected response format' };
    }
  } catch (error) {
    console.log('❌ Backend connection failed:', error.message);
    console.log('🔄 Falling back to dummy data mode');
    return { success: false, error: error.message };
  }
};

export const testAuthEndpoints = async () => {
  try {
    console.log('🔍 Testing auth endpoints...');

    // Test register endpoint with dummy data
    const testUser = {
      name: 'Test User',
      email: `test_${Date.now()}@example.com`,
      password: 'testpassword123',
    };

    const response = await httpClient.post('/auth/register', testUser);

    if (response.data?.status === 'success') {
      console.log('✅ Auth endpoints are working!');
      return { success: true, user: response.data.data.user };
    } else {
      console.log('⚠️ Auth test failed:', response.data);
      return { success: false, error: 'Auth test failed' };
    }
  } catch (error) {
    console.log('❌ Auth test error:', error.message);
    return { success: false, error: error.message };
  }
};

export const testStartBuildingEndpoint = async () => {
  try {
    console.log('🔍 Testing start-building endpoint...');

    const testWebsite = {
      websiteName: `test-site-${Date.now()}`,
      websiteType: 'business',
      tagline: 'Test Business',
      themeColor: '#10b981',
    };

    const response = await httpClient.post(
      '/websites/start-building',
      testWebsite
    );

    if (response.data?.status === 'success') {
      console.log('✅ Start-building endpoint is working!');
      return { success: true, website: response.data.data };
    } else {
      console.log('⚠️ Start-building test failed:', response.data);
      return { success: false, error: 'Start-building test failed' };
    }
  } catch (error) {
    console.log('❌ Start-building test error:', error.message);
    return { success: false, error: error.message };
  }
};

// Run all tests
export const runAllBackendTests = async () => {
  console.log('🚀 Running backend integration tests...');

  const results = {
    health: await testBackendConnection(),
    auth: await testAuthEndpoints(),
    startBuilding: await testStartBuildingEndpoint(),
  };

  const allSuccessful = Object.values(results).every(r => r.success);

  if (allSuccessful) {
    console.log('🎉 All backend tests passed! Integration is working.');
  } else {
    console.log('⚠️ Some backend tests failed. Check the logs above.');
  }

  return results;
};
