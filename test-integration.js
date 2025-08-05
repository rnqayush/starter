// Simple integration test for frontend-backend connection
// Run this in the browser console to test the integration

const testIntegration = async () => {
  console.log('🚀 Testing Frontend-Backend Integration...');
  
  try {
    // Test 1: Backend health check
    console.log('\n📋 Test 1: Backend Health Check');
    const healthResponse = await fetch('http://localhost:5000/api/health');
    const healthData = await healthResponse.json();
    
    if (healthData.status === 'success') {
      console.log('✅ Backend is running and healthy');
    } else {
      console.log('❌ Backend health check failed:', healthData);
      return;
    }
    
    // Test 2: Register a test user
    console.log('\n📋 Test 2: User Registration');
    const testUser = {
      name: 'Test User',
      email: `test_${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });
    
    const registerData = await registerResponse.json();
    
    if (registerData.status === 'success') {
      console.log('✅ User registration successful');
      console.log('👤 User:', registerData.data.user);
      
      // Store token for further tests
      const token = registerData.data.token;
      
      // Test 3: Create a website using start-building
      console.log('\n📋 Test 3: Website Creation');
      const websiteData = {
        websiteName: `test-site-${Date.now()}`,
        websiteType: 'business',
        tagline: 'Test Business Website',
        themeColor: '#10b981'
      };
      
      const websiteResponse = await fetch('http://localhost:5000/api/websites/start-building', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(websiteData)
      });
      
      const websiteResponseData = await websiteResponse.json();
      
      if (websiteResponseData.status === 'success') {
        console.log('✅ Website creation successful');
        console.log('🌐 Website:', websiteResponseData.data);
      } else {
        console.log('❌ Website creation failed:', websiteResponseData);
      }
      
    } else {
      console.log('❌ User registration failed:', registerData);
    }
    
    console.log('\n🎉 Integration test completed!');
    
  } catch (error) {
    console.error('❌ Integration test failed:', error);
  }
};

// Auto-run if in browser
if (typeof window !== 'undefined') {
  testIntegration();
}

module.exports = { testIntegration };
