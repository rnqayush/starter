// API Configuration
// Centralized configuration for API settings

// Environment-based configuration
const getApiConfig = () => {
  const environment = process.env.NODE_ENV || 'development';
  
  const configs = {
    development: {
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
      timeout: 10000,
      withCredentials: false,
      enableMocking: true, // Enable fake API responses in development
    },
    production: {
      baseURL: process.env.REACT_APP_API_URL || 'https://api.yourdomain.com',
      timeout: 15000,
      withCredentials: true,
      enableMocking: false,
    },
    test: {
      baseURL: 'http://localhost:3001/api',
      timeout: 5000,
      withCredentials: false,
      enableMocking: true,
    },
  };

  return configs[environment] || configs.development;
};

// HTTP status codes for consistent usage across the app
export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  
  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  
  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

// Request timeouts for different operations
export const TIMEOUTS = {
  DEFAULT: 10000,
  UPLOAD: 30000,
  DOWNLOAD: 20000,
  SEARCH: 8000,
  AUTH: 5000,
};

// Retry configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  retryCondition: (error) => {
    // Retry on network errors or 5xx server errors
    return !error.response || (error.response.status >= 500 && error.response.status < 600);
  },
};

// Request/Response interceptor configuration
export const INTERCEPTOR_CONFIG = {
  request: {
    enableLogging: process.env.NODE_ENV === 'development',
    enableAuth: true,
    enableCsrf: false, // Enable if your API requires CSRF tokens
  },
  response: {
    enableLogging: process.env.NODE_ENV === 'development',
    enableErrorHandling: true,
    enableRetry: true,
  },
};

// Cache configuration
export const CACHE_CONFIG = {
  enableCache: true,
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  maxSize: 100, // Maximum number of cached responses
  strategies: {
    auth: 15 * 60 * 1000, // 15 minutes
    static: 60 * 60 * 1000, // 1 hour
    dynamic: 2 * 60 * 1000, // 2 minutes
  },
};

// API Rate limiting
export const RATE_LIMIT_CONFIG = {
  enableRateLimit: true,
  maxRequests: 100,
  windowMs: 60000, // 1 minute
  skipSuccessfulRequests: false,
};

// Content type headers
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
  XML: 'application/xml',
};

// Common headers
export const DEFAULT_HEADERS = {
  'Content-Type': CONTENT_TYPES.JSON,
  'Accept': CONTENT_TYPES.JSON,
  'X-Requested-With': 'XMLHttpRequest',
};

// Authentication configuration
export const AUTH_CONFIG = {
  tokenStorageKey: 'authToken',
  refreshTokenStorageKey: 'refreshToken',
  userStorageKey: 'user',
  tokenPrefix: 'Bearer',
  autoRefresh: true,
  refreshThreshold: 5 * 60 * 1000, // Refresh token 5 minutes before expiry
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You do not have permission.',
  NOT_FOUND: 'Requested resource not found.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  RATE_LIMITED: 'Too many requests. Please wait before trying again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  DATA_SAVED: 'Data saved successfully',
  DATA_UPDATED: 'Data updated successfully',
  DATA_DELETED: 'Data deleted successfully',
  OPERATION_SUCCESS: 'Operation completed successfully',
};

// Export the main config
export const API_CONFIG = getApiConfig();

// Export environment check utilities
export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const isProduction = () => process.env.NODE_ENV === 'production';
export const isTest = () => process.env.NODE_ENV === 'test';

// Export feature flags
export const FEATURE_FLAGS = {
  enableMocking: API_CONFIG.enableMocking,
  enableLogging: isDevelopment(),
  enableAnalytics: isProduction(),
  enableErrorReporting: isProduction(),
  enableCaching: true,
  enableRetry: true,
};

export default {
  API_CONFIG,
  HTTP_STATUS,
  TIMEOUTS,
  RETRY_CONFIG,
  INTERCEPTOR_CONFIG,
  CACHE_CONFIG,
  RATE_LIMIT_CONFIG,
  CONTENT_TYPES,
  DEFAULT_HEADERS,
  AUTH_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS,
  isDevelopment,
  isProduction,
  isTest,
};
