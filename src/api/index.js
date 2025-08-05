// Main API Index
// Central exports for the entire API layer

// Export HTTP client
export { default as httpClient, HttpClient, APIError } from './client/httpClient';

// Export configuration
export { 
  default as apiConfig,
  API_CONFIG,
  HTTP_STATUS,
  TIMEOUTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS,
  isDevelopment,
  isProduction,
  isTest
} from './config/config';

// Export endpoints
export { 
  default as API_ENDPOINTS,
  AUTH_ENDPOINTS,
  BUSINESS_ENDPOINTS,
  ECOMMERCE_ENDPOINTS,
  HOTEL_ENDPOINTS,
  WEDDING_ENDPOINTS,
  AUTOMOBILE_ENDPOINTS,
  USER_ENDPOINTS,
  BLOG_ENDPOINTS,
  MEDIA_ENDPOINTS,
  SYSTEM_ENDPOINTS,
  buildQueryParams,
  buildUrlWithParams
} from './config/endpoints';

// Export all services
export {
  default as apiServices,
  authService,
  businessService,
  ecommerceService,
  hotelService,
  weddingService,
  ecommerceUtils
} from './services';

// Re-export legacy API functions for backward compatibility
export * from './services';

// Legacy network manager exports (for backward compatibility)
export { default as networkManager } from './client/httpClient';
export { STATUS_CODES } from './networkManager';

// Note: The old networkManager.js is still available for components that import it directly,
// but new code should use httpClient or the service layer
