/**
 * Test Script for Wedding Website End-to-End Flow
 * This script tests the complete flow from creating a wedding website to displaying it
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Test data for creating a wedding website
const testWeddingData = {
  websiteName: 'test-wedding-' + Date.now(),
  websiteType: 'weddings',
  tagline: 'Beautiful Wedding Services',
  themeColor: '#ff6b9d',
  businessName: 'Elegant Wedding Planners',
  description: 'We create magical wedding experiences'
};

async function testBackendHealth() {
  console.log('🔍 Testing backend health...');
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Backend is healthy:', data);
      return true;
    } else {
      console.error('❌ Backend health check failed:', response.status, data);
      return false;
    }
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return false;
  }
}

async function createWeddingWebsite() {
  console.log('🔍 Creating wedding website...');
  console.log('📦 Test data:', testWeddingData);
  
  try {
    const response = await fetch(`${API_BASE_URL}/websites/start-building`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testWeddingData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Wedding website created successfully:', data);
      return data;
    } else {
      console.error('❌ Failed to create wedding website:', response.status, data);
      return null;
    }
  } catch (error) {
    console.error('❌ Error creating wedding website:', error.message);
    return null;
  }
}

async function getWeddingWebsite(websiteName) {
  console.log(`🔍 Fetching wedding website: ${websiteName}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/websites/${websiteName}`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Wedding website fetched successfully:');
      console.log('📊 Website Type:', data.websiteType);
      console.log('📊 Status:', data.status);
      console.log('📊 Has Vendor Data:', data.data && data.data.vendors ? 'Yes' : 'No');
      
      if (data.data && data.data.vendors) {
        const vendorKeys = Object.keys(data.data.vendors);
        console.log('📊 Vendor Keys:', vendorKeys);
        console.log('📊 First Vendor:', data.data.vendors[vendorKeys[0]]);
      }
      
      return data;
    } else {
      console.error('❌ Failed to fetch wedding website:', response.status, data);
      return null;
    }
  } catch (error) {
    console.error('❌ Error fetching wedding website:', error.message);
    return null;
  }
}

async function testSmartRouterLogic(websiteData) {
  console.log('🔍 Testing SmartRouter logic...');
  
  if (!websiteData) {
    console.error('❌ No website data to test');
    return false;
  }
  
  // Simulate SmartRouter type mapping
  const typeMapping = {
    'hotels': 'hotel',
    'ecommerce': 'ecommerce', 
    'automobiles': 'automobile',
    'weddings': 'wedding',
    'professional': 'business'
  };
  
  const moduleType = typeMapping[websiteData.websiteType] || 'business';
  console.log('🎯 Mapped module type:', moduleType);
  
  if (moduleType === 'wedding') {
    console.log('✅ SmartRouter should route to WeddingModule');
    
    // Check if vendor data is properly structured
    if (websiteData.data && websiteData.data.vendors) {
      const vendorKeys = Object.keys(websiteData.data.vendors);
      console.log('✅ Vendor data structure is correct');
      console.log('📊 Available vendors:', vendorKeys);
      return true;
    } else {
      console.error('❌ Vendor data structure is incorrect');
      console.log('📊 Data structure:', websiteData.data);
      return false;
    }
  } else {
    console.error('❌ Wrong module type detected:', moduleType);
    return false;
  }
}

async function runFullTest() {
  console.log('🚀 Starting Wedding Website End-to-End Test...\n');
  
  // Step 1: Check backend health
  const isHealthy = await testBackendHealth();
  if (!isHealthy) {
    console.error('❌ Backend is not healthy. Please start the backend server.');
    return;
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Step 2: Create wedding website
  const createdWebsite = await createWeddingWebsite();
  if (!createdWebsite) {
    console.error('❌ Failed to create wedding website. Test aborted.');
    return;
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Step 3: Fetch the created website
  const websiteData = await getWeddingWebsite(testWeddingData.websiteName);
  if (!websiteData) {
    console.error('❌ Failed to fetch wedding website. Test aborted.');
    return;
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Step 4: Test SmartRouter logic
  const routerTest = await testSmartRouterLogic(websiteData);
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Summary
  if (routerTest) {
    console.log('🎉 END-TO-END TEST PASSED!');
    console.log(`✅ Wedding website "${testWeddingData.websiteName}" should display correctly`);
    console.log(`🔗 Test URL: http://localhost:3000/${testWeddingData.websiteName}`);
  } else {
    console.log('❌ END-TO-END TEST FAILED!');
    console.log('Please check the issues above and fix them.');
  }
}

// Run the test
runFullTest().catch(error => {
  console.error('❌ Test script error:', error);
});

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testWeddingWebsite = {
    runFullTest,
    testBackendHealth,
    createWeddingWebsite,
    getWeddingWebsite,
    testSmartRouterLogic
  };
}
