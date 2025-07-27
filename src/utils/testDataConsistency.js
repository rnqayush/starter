// Test script to verify that both pages use the same data source
// This simulates the API calls that both pages make to ensure data consistency

import { fetchBusinessData } from './businessAPI';
import { getBusinessWebsiteData } from '../DummyData/businessWebsiteData';

/**
 * Test function to verify data consistency between BusinessWebsitePage and AdminDashboard
 */
export const testDataConsistency = async () => {
  console.log('🧪 Starting data consistency test...');

  const testResults = {
    apiTests: [],
    dataConsistencyTests: [],
    errors: [],
    success: true,
  };

  // Test data for different business types
  const businessTypes = ['salon', 'gym', 'restaurant', 'freelancer'];

  try {
    for (const businessType of businessTypes) {
      console.log(`\n📋 Testing ${businessType}...`);

      // Test 1: Verify API call returns expected data structure
      try {
        const apiResponse = await fetchBusinessData(businessType);

        if (apiResponse.success && apiResponse.data) {
          console.log(`✅ API call successful for ${businessType}`);
          testResults.apiTests.push({
            businessType,
            status: 'success',
            message: 'API call returned valid data',
          });

          // Test 2: Verify data structure consistency
          const apiData = apiResponse.data;
          const directData = getBusinessWebsiteData(businessType);

          if (JSON.stringify(apiData) === JSON.stringify(directData)) {
            console.log(`✅ Data consistency verified for ${businessType}`);
            testResults.dataConsistencyTests.push({
              businessType,
              status: 'success',
              message: 'API data matches direct data access',
            });
          } else {
            console.log(`❌ Data inconsistency found for ${businessType}`);
            testResults.dataConsistencyTests.push({
              businessType,
              status: 'error',
              message: 'API data does not match direct data access',
            });
            testResults.success = false;
          }

          // Test 3: Verify required fields are present
          const requiredFields = [
            'id',
            'name',
            'slug',
            'hero',
            'about',
            'services',
            'contact',
          ];
          const missingFields = requiredFields.filter(field => !apiData[field]);

          if (missingFields.length === 0) {
            console.log(`✅ All required fields present for ${businessType}`);
          } else {
            console.log(
              `❌ Missing required fields for ${businessType}: ${missingFields.join(', ')}`
            );
            testResults.errors.push({
              businessType,
              type: 'missing_fields',
              fields: missingFields,
            });
            testResults.success = false;
          }
        } else {
          console.log(
            `❌ API call failed for ${businessType}: ${apiResponse.message}`
          );
          testResults.apiTests.push({
            businessType,
            status: 'error',
            message: apiResponse.message || 'API call failed',
          });
          testResults.success = false;
        }
      } catch (error) {
        console.log(`❌ Error testing ${businessType}: ${error.message}`);
        testResults.errors.push({
          businessType,
          type: 'exception',
          message: error.message,
        });
        testResults.success = false;
      }
    }

    // Test 4: Verify API response time
    console.log('\n⏱️ Testing API response time...');
    const startTime = Date.now();
    await fetchBusinessData('salon');
    const responseTime = Date.now() - startTime;

    if (responseTime < 1000) {
      console.log(`✅ API response time acceptable: ${responseTime}ms`);
    } else {
      console.log(`⚠️ API response time slow: ${responseTime}ms`);
    }

    // Final results
    console.log('\n📊 Test Results Summary:');
    console.log('='.repeat(50));
    console.log(
      `Overall Status: ${testResults.success ? '✅ PASSED' : '❌ FAILED'}`
    );
    console.log(
      `API Tests: ${testResults.apiTests.filter(t => t.status === 'success').length}/${testResults.apiTests.length} passed`
    );
    console.log(
      `Data Consistency Tests: ${testResults.dataConsistencyTests.filter(t => t.status === 'success').length}/${testResults.dataConsistencyTests.length} passed`
    );
    console.log(`Errors: ${testResults.errors.length}`);

    if (testResults.errors.length > 0) {
      console.log('\n❌ Errors found:');
      testResults.errors.forEach(error => {
        console.log(
          `  - ${error.businessType}: ${error.message || error.type}`
        );
      });
    }

    return testResults;
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    testResults.success = false;
    testResults.errors.push({
      type: 'test_suite_error',
      message: error.message,
    });
    return testResults;
  }
};

/**
 * Simulate real-world usage scenarios
 */
export const testRealWorldScenarios = async () => {
  console.log('\n🌍 Testing real-world scenarios...');

  try {
    // Scenario 1: Business Website Page loads data
    console.log('📱 Scenario 1: Business Website Page data loading...');
    const websitePageData = await fetchBusinessData('salon');

    if (websitePageData.success) {
      console.log('✅ Business Website Page can fetch data successfully');
    } else {
      console.log('❌ Business Website Page failed to fetch data');
    }

    // Scenario 2: Admin Dashboard loads same data
    console.log('🔧 Scenario 2: Admin Dashboard data loading...');
    const adminDashboardData = await fetchBusinessData('salon');

    if (adminDashboardData.success) {
      console.log('✅ Admin Dashboard can fetch data successfully');
    } else {
      console.log('❌ Admin Dashboard failed to fetch data');
    }

    // Scenario 3: Data consistency between pages
    if (websitePageData.success && adminDashboardData.success) {
      const dataMatches =
        JSON.stringify(websitePageData.data) ===
        JSON.stringify(adminDashboardData.data);

      if (dataMatches) {
        console.log('✅ Both pages receive identical data');
      } else {
        console.log('❌ Pages receive different data');
      }
    }

    // Scenario 4: Handle invalid business type
    console.log('🚫 Scenario 4: Invalid business type handling...');
    const invalidData = await fetchBusinessData('invalid-business');

    if (!invalidData.success) {
      console.log('✅ Invalid business type handled gracefully');
    } else {
      console.log('❌ Invalid business type should fail');
    }

    console.log('\n✅ Real-world scenarios testing completed');
  } catch (error) {
    console.error('❌ Real-world scenarios test failed:', error);
  }
};

// Run tests if called directly
if (typeof window !== 'undefined' && window.location?.pathname) {
  // Browser environment - tests can be run from browser console
  window.testDataConsistency = testDataConsistency;
  window.testRealWorldScenarios = testRealWorldScenarios;

  console.log('🧪 Data consistency tests available:');
  console.log('  - Run: testDataConsistency()');
  console.log('  - Run: testRealWorldScenarios()');
}

export default {
  testDataConsistency,
  testRealWorldScenarios,
};
