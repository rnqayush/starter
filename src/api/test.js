// API Integration Test
// Tests the new API structure to ensure everything works correctly

import { 
  apiServices,
  authService,
  businessService,
  ecommerceService,
  hotelService,
  weddingService,
  httpClient,
  API_ENDPOINTS
} from './index';

// Test function to verify API services are working
export const testAPIServices = async () => {
  console.log('🧪 Testing new API architecture...\n');

  // Test 1: Check if all services are properly imported
  console.log('✅ Test 1: Service imports');
  console.log('Auth service:', authService ? '✓' : '✗');
  console.log('Business service:', businessService ? '✓' : '✗');
  console.log('Ecommerce service:', ecommerceService ? '✓' : '✗');
  console.log('Hotel service:', hotelService ? '✓' : '✗');
  console.log('Wedding service:', weddingService ? '✓' : '✗');
  console.log('HTTP client:', httpClient ? '✓' : '✗');
  console.log('API endpoints:', API_ENDPOINTS ? '✓' : '✗');
  console.log('');

  // Test 2: Check service methods
  console.log('✅ Test 2: Service methods');
  console.log('Auth methods:', {
    login: typeof authService.login === 'function' ? '✓' : '✗',
    register: typeof authService.register === 'function' ? '✓' : '✗',
    logout: typeof authService.logout === 'function' ? '✓' : '✗'
  });

  console.log('Business methods:', {
    fetchBusinessData: typeof businessService.fetchBusinessData === 'function' ? '✓' : '✗',
    updateBusinessData: typeof businessService.updateBusinessData === 'function' ? '✓' : '✗',
    detectBusinessType: typeof businessService.detectBusinessType === 'function' ? '✓' : '✗'
  });

  console.log('Ecommerce methods:', {
    getProducts: typeof ecommerceService.getProducts === 'function' ? '✓' : '✗',
    createProduct: typeof ecommerceService.createProduct === 'function' ? '✓' : '✗',
    getCategories: typeof ecommerceService.getCategories === 'function' ? '✓' : '✗'
  });

  console.log('Hotel methods:', {
    fetchHotels: typeof hotelService.fetchHotels === 'function' ? '✓' : '✗',
    fetchHotelById: typeof hotelService.fetchHotelById === 'function' ? '✓' : '✗',
    searchHotels: typeof hotelService.searchHotels === 'function' ? '✓' : '✗'
  });

  console.log('Wedding methods:', {
    getWeddingVendors: typeof weddingService.getWeddingVendors === 'function' ? '✓' : '✗',
    searchVendors: typeof weddingService.searchVendors === 'function' ? '✓' : '✗',
    getFeaturedVendors: typeof weddingService.getFeaturedVendors === 'function' ? '✓' : '✗'
  });
  console.log('');

  // Test 3: Check API services aggregated object
  console.log('✅ Test 3: API services object');
  console.log('apiServices.auth:', apiServices.auth ? '✓' : '✗');
  console.log('apiServices.business:', apiServices.business ? '✓' : '✗');
  console.log('apiServices.ecommerce:', apiServices.ecommerce ? '✓' : '✗');
  console.log('apiServices.hotel:', apiServices.hotel ? '✓' : '✗');
  console.log('apiServices.wedding:', apiServices.wedding ? '✓' : '✗');
  console.log('');

  // Test 4: Check endpoints configuration
  console.log('✅ Test 4: Endpoints configuration');
  console.log('AUTH endpoints:', API_ENDPOINTS.AUTH ? '✓' : '✗');
  console.log('BUSINESS endpoints:', API_ENDPOINTS.BUSINESS ? '✓' : '✗');
  console.log('ECOMMERCE endpoints:', API_ENDPOINTS.ECOMMERCE ? '✓' : '✗');
  console.log('HOTEL endpoints:', API_ENDPOINTS.HOTEL ? '✓' : '✗');
  console.log('WEDDING endpoints:', API_ENDPOINTS.WEDDING ? '✓' : '✗');
  console.log('');

  // Test 5: Test mock API calls (if mocking is enabled)
  console.log('✅ Test 5: Mock API functionality');
  
  try {
    // Test business service mock call
    const businessResult = await businessService.fetchBusinessData('salon');
    console.log('Business mock call:', businessResult.success ? '✓' : '✗');
    
    // Test wedding service mock call
    const weddingResult = await weddingService.getWeddingVendors();
    console.log('Wedding mock call:', weddingResult.success ? '✓' : '✗');
    
    // Test ecommerce service mock call
    const ecommerceResult = await ecommerceService.getProducts('test-store');
    console.log('Ecommerce mock call:', ecommerceResult.success ? '✓' : '✗');
    
    // Test hotel service mock call
    const hotelResult = await hotelService.fetchHotels();
    console.log('Hotel mock call:', hotelResult.success ? '✓' : '✗');
    
    console.log('');
    
  } catch (error) {
    console.error('❌ Error in mock API calls:', error);
  }

  // Test 6: Check backward compatibility
  console.log('✅ Test 6: Backward compatibility');
  
  // Check if legacy exports still work
  const legacyTests = [];
  
  try {
    // Import legacy exports to test
    const { fetchBusinessData, BusinessAPI } = await import('./services');
    legacyTests.push({
      name: 'fetchBusinessData function',
      result: typeof fetchBusinessData === 'function'
    });
    legacyTests.push({
      name: 'BusinessAPI object',
      result: BusinessAPI && typeof BusinessAPI === 'object'
    });
  } catch (error) {
    legacyTests.push({
      name: 'Legacy imports',
      result: false,
      error: error.message
    });
  }

  legacyTests.forEach(test => {
    console.log(`${test.name}: ${test.result ? '✓' : '✗'}${test.error ? ` (${test.error})` : ''}`);
  });

  console.log('\n🎉 API architecture test completed!');
  console.log('If all tests show ✓, the new API structure is working correctly.');
};

// Auto-run test in development
if (process.env.NODE_ENV === 'development') {
  // Run test after a short delay to allow all modules to load
  setTimeout(() => {
    testAPIServices().catch(console.error);
  }, 1000);
}

export default testAPIServices;
