// Centralized API endpoints configuration
// All API endpoint URLs are defined here for easy maintenance

const BASE_PATH = `/api`;

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${BASE_PATH}/auth/register`,
  LOGIN: `${BASE_PATH}/auth/login`,
  LOGOUT: `${BASE_PATH}/auth/logout`,
  REFRESH_TOKEN: `${BASE_PATH}/auth/refresh`,
  FORGOT_PASSWORD: `${BASE_PATH}/auth/forgot-password`,
  RESET_PASSWORD: `${BASE_PATH}/auth/reset-password`,
  VERIFY_EMAIL: `${BASE_PATH}/auth/verify-email`,
  RESEND_VERIFICATION: `${BASE_PATH}/auth/resend-verification`,
  PROFILE: `${BASE_PATH}/auth/profile`,
};

// Business/Portfolio endpoints
export const BUSINESS_ENDPOINTS = {
  BASE: `${BASE_PATH}/business`,
  BY_SLUG: slug => `${BASE_PATH}/business/${slug}`,
  SECTIONS: slug => `${BASE_PATH}/business/${slug}/sections`,
  SECTION: (slug, section) =>
    `${BASE_PATH}/business/${slug}/sections/${section}`,
  VALIDATE: slug => `${BASE_PATH}/business/${slug}/validate`,
  MULTIPLE: `${BASE_PATH}/business/multiple`,
  STATUS: `${BASE_PATH}/business/status`,
};

// E-commerce endpoints
export const ECOMMERCE_ENDPOINTS = {
  BASE: `${BASE_PATH}/ecommerce`,
  STORE: slug => `${BASE_PATH}/ecommerce/${slug}`,
  PRODUCTS: slug => `${BASE_PATH}/ecommerce/${slug}/products`,
  PRODUCT: (slug, productId) => `${BASE_PATH}/ecommerce/${slug}/products/${productId}`,
  START_BUILDING: `${BASE_PATH}/ecommerce/start-building`,
};

// Hotel endpoints
export const HOTEL_ENDPOINTS = {
  BASE: `${BASE_PATH}/hotels`,
  HOTEL: identifier => `${BASE_PATH}/hotels/${identifier}`,
  ROOMS: identifier => `${BASE_PATH}/hotels/${identifier}/rooms`,
  START_BUILDING: `${BASE_PATH}/hotels/start-building`,
};

// Wedding endpoints
export const WEDDING_ENDPOINTS = {
  BASE: `${BASE_PATH}/weddings`,
  VENDORS: `${BASE_PATH}/weddings/vendors`,
  VENDOR: identifier => `${BASE_PATH}/weddings/vendors/${identifier}`,
  VENDOR_PORTFOLIO: identifier => `${BASE_PATH}/weddings/vendors/${identifier}/portfolio`,
  START_BUILDING: `${BASE_PATH}/weddings/start-building`,
};

// Automobile endpoints
export const AUTOMOBILE_ENDPOINTS = {
  BASE: `${BASE_PATH}/automobiles`,
  DEALERSHIP: slug => `${BASE_PATH}/automobiles/${slug}`,
  VEHICLES: slug => `${BASE_PATH}/automobiles/${slug}/vehicles`,
  VEHICLE: (slug, vehicleId) => `${BASE_PATH}/automobiles/${slug}/vehicles/${vehicleId}`,
  CATEGORIES: slug => `${BASE_PATH}/automobiles/${slug}/categories`,
  START_BUILDING: `${BASE_PATH}/automobiles/start-building`,
};

// Website endpoints for start-building functionality
export const WEBSITE_ENDPOINTS = {
  BASE: `${BASE_PATH}/websites`,
  CREATE_FROM_START_BUILDING: `${BASE_PATH}/websites/start-building`,
  CHECK_AVAILABILITY: websiteName => `${BASE_PATH}/websites/check/${websiteName}`,
  BY_NAME: websiteName => `${BASE_PATH}/websites/${websiteName}`,
  USER_WEBSITES: `${BASE_PATH}/websites/user/websites`,
  ANALYTICS: websiteName => `${BASE_PATH}/websites/${websiteName}/analytics`,
};

// User management endpoints
export const USER_ENDPOINTS = {
  BASE: `${BASE_PATH}/users`,
  PROFILE: userId => `${BASE_PATH}/users/${userId}`,
  PREFERENCES: userId => `${BASE_PATH}/users/${userId}/preferences`,
  AVATAR: userId => `${BASE_PATH}/users/${userId}/avatar`,
};

// Blog endpoints
export const BLOG_ENDPOINTS = {
  BASE: `${BASE_PATH}/blogs`,
  BLOG: id => `${BASE_PATH}/blogs/${id}`,
  FEATURED: `${BASE_PATH}/blogs/featured`,
  CATEGORIES: `${BASE_PATH}/blogs/categories`,
  SEARCH: `${BASE_PATH}/blogs/search`,
};

// Media/Upload endpoints
export const MEDIA_ENDPOINTS = {
  UPLOAD: `${BASE_PATH}/media/upload`,
  BULK_UPLOAD: `${BASE_PATH}/media/bulk-upload`,
  DELETE: mediaId => `${BASE_PATH}/media/${mediaId}`,
};

// System endpoints
export const SYSTEM_ENDPOINTS = {
  HEALTH: `${BASE_PATH}/health`,
  VERSION: `${BASE_PATH}/version`,
  CONFIG: `${BASE_PATH}/config`,
};

// Export all endpoints as a single object for easy access
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  BUSINESS: BUSINESS_ENDPOINTS,
  ECOMMERCE: ECOMMERCE_ENDPOINTS,
  HOTEL: HOTEL_ENDPOINTS,
  WEDDING: WEDDING_ENDPOINTS,
  AUTOMOBILE: AUTOMOBILE_ENDPOINTS,
  USER: USER_ENDPOINTS,
  BLOG: BLOG_ENDPOINTS,
  MEDIA: MEDIA_ENDPOINTS,
  SYSTEM: SYSTEM_ENDPOINTS,
};

// Helper function to build query parameters
export const buildQueryParams = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  return searchParams.toString();
};

// Helper function to build URL with query parameters
export const buildUrlWithParams = (endpoint, params = {}) => {
  const queryString = buildQueryParams(params);
  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

export default API_ENDPOINTS;
