// Test Backend Integration
// Copy and paste this in your browser console to test the backend

console.log('🚀 Testing Backend Integration...');

// Test 1: Health Check
fetch('http://localhost:5000/api/health')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('✅ Backend Health Check: PASSED');
      console.log('📊 Backend Response:', data);

      // Test 2: Register a test user
      const testUser = {
        name: 'Test User',
        email: `test_${Date.now()}@example.com`,
        password: 'testpassword123',
      };

      return fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser),
      });
    } else {
      throw new Error('Backend health check failed');
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('✅ User Registration: PASSED');
      console.log('👤 User Data:', data.data.user);

      // Test 3: Create website
      const websiteData = {
        websiteName: `test-site-${Date.now()}`,
        websiteType: 'business',
        tagline: 'Test Business',
        themeColor: '#10b981',
      };

      return fetch('http://localhost:5000/api/websites/start-building', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.data.token}`,
        },
        body: JSON.stringify(websiteData),
      });
    } else {
      throw new Error('User registration failed: ' + data.message);
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('✅ Website Creation: PASSED');
      console.log('🌐 Website Data:', data.data);
      console.log(
        '\n🎉 ALL TESTS PASSED! Backend integration is working perfectly!'
      );
    } else {
      throw new Error('Website creation failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('❌ Test Failed:', error.message);
    console.log('🔄 The frontend will fall back to demo mode automatically.');
  });
