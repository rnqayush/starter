// API Configuration Constants
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
  },
  
  // Vendor Management
  VENDOR: {
    REGISTER: '/vendor/register',
    LOGIN: '/vendor/login',
    PROFILE: '/vendor/profile',
    DASHBOARD: '/vendor/dashboard',
    BY_ID: (id) => `/vendor/${id}`,
  },
  
  // Admin Management
  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    VENDORS: '/admin/vendors',
    APPROVE_VENDOR: (id) => `/admin/vendors/${id}/approve`,
    REJECT_VENDOR: (id) => `/admin/vendors/${id}/reject`,
    DELETE_VENDOR: (id) => `/admin/vendors/${id}`,
    USERS: '/admin/users',
  },
  
  // Business Categories
  HOTEL: {
    LIST: '/hotel',
    BY_ID: (id) => `/hotel/${id}`,
    CREATE: '/hotel',
    UPDATE: (id) => `/hotel/${id}`,
    DELETE: (id) => `/hotel/${id}`,
    VENDOR_HOTELS: '/hotel/vendor/my-hotels',
  },
  
  ECOMMERCE: {
    LIST: '/ecommerce',
    BY_ID: (id) => `/ecommerce/${id}`,
    CREATE: '/ecommerce',
    UPDATE: (id) => `/ecommerce/${id}`,
    DELETE: (id) => `/ecommerce/${id}`,
    VENDOR_PRODUCTS: '/ecommerce/vendor/my-products',
  },
  
  AUTOMOBILE: {
    LIST: '/automobile',
    BY_ID: (id) => `/automobile/${id}`,
    CREATE: '/automobile',
    UPDATE: (id) => `/automobile/${id}`,
    DELETE: (id) => `/automobile/${id}`,
    VENDOR_VEHICLES: '/automobile/vendor/my-vehicles',
  },
  
  WEDDING: {
    LIST: '/wedding',
    BY_ID: (id) => `/wedding/${id}`,
    CREATE: '/wedding',
    UPDATE: (id) => `/wedding/${id}`,
    DELETE: (id) => `/wedding/${id}`,
    VENDOR_SERVICES: '/wedding/vendor/my-services',
  },
  
  // Homepage
  HOMEPAGE: {
    CONTENT: '/homepage',
    STATS: '/homepage/stats',
    SEARCH: '/homepage/search',
  },
  
  // Test
  TEST: {
    PING: '/test/ping',
    HEALTH: '/test/health',
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Request Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  REFRESH_TOKEN: 'refresh_token',
  REMEMBER_ME: 'remember_me',
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
};

// Business Categories
export const BUSINESS_CATEGORIES = {
  HOTEL: 'hotel',
  ECOMMERCE: 'ecommerce',
  AUTOMOBILE: 'automobile',
  WEDDING: 'wedding',
};

// API Request Timeout (in milliseconds)
export const API_TIMEOUT = 10000;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

