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
  BASE: `${BASE_PATH}/stores`,
  STORE: slug => `${BASE_PATH}/stores/${slug}`,
  PRODUCTS: slug => `${BASE_PATH}/stores/${slug}/products`,
  PRODUCT: (slug, productId) =>
    `${BASE_PATH}/stores/${slug}/products/${productId}`,
  CATEGORIES: slug => `${BASE_PATH}/stores/${slug}/categories`,
  CATEGORY: (slug, categoryId) =>
    `${BASE_PATH}/stores/${slug}/categories/${categoryId}`,
  ORDERS: slug => `${BASE_PATH}/stores/${slug}/orders`,
  ORDER: (slug, orderId) => `${BASE_PATH}/stores/${slug}/orders/${orderId}`,
  ORDER_STATUS: (slug, orderId) =>
    `${BASE_PATH}/stores/${slug}/orders/${orderId}/status`,
  ENQUIRIES: slug => `${BASE_PATH}/stores/${slug}/enquiries`,
  ENQUIRY_RESPOND: (slug, enquiryId) =>
    `${BASE_PATH}/stores/${slug}/enquiries/${enquiryId}/respond`,
  ANALYTICS: slug => `${BASE_PATH}/stores/${slug}/analytics`,
  WISHLIST: slug => `${BASE_PATH}/stores/${slug}/wishlist`,
  WISHLIST_ITEM: (slug, productId) =>
    `${BASE_PATH}/stores/${slug}/wishlist/${productId}`,
  BULK_PRODUCTS: slug => `${BASE_PATH}/stores/${slug}/products/bulk`,
  SEARCH_PRODUCTS: slug => `${BASE_PATH}/stores/${slug}/products/search`,
  SYNC: slug => `${BASE_PATH}/stores/${slug}/sync`,
  SECTIONS: slug => `${BASE_PATH}/stores/${slug}/sections`,
  SECTION: (slug, sectionId) =>
    `${BASE_PATH}/stores/${slug}/sections/${sectionId}`,
};

// Hotel endpoints
export const HOTEL_ENDPOINTS = {
  BASE: `${BASE_PATH}/hotels`,
  HOTEL: id => `${BASE_PATH}/hotels/${id}`,
  SEARCH: `${BASE_PATH}/hotels/search`,
  FEATURED: `${BASE_PATH}/hotels/featured`,
  BY_CITY: city => `${BASE_PATH}/hotels/city/${city}`,
  BY_OWNER: ownerId => `${BASE_PATH}/hotels/owner/${ownerId}`,
  ROOMS: hotelId => `${BASE_PATH}/hotels/${hotelId}/rooms`,
  ROOM: (hotelId, roomId) => `${BASE_PATH}/hotels/${hotelId}/rooms/${roomId}`,
  SECTIONS: hotelId => `${BASE_PATH}/hotels/${hotelId}/sections`,
  REVIEWS: hotelId => `${BASE_PATH}/hotels/${hotelId}/reviews`,
  BOOKINGS: `${BASE_PATH}/bookings`,
  BOOKING: bookingId => `${BASE_PATH}/bookings/${bookingId}`,
  AMENITIES: `${BASE_PATH}/hotels/amenities`,
};

// Wedding endpoints
export const WEDDING_ENDPOINTS = {
  BASE: `${BASE_PATH}/wedding`,
  VENDORS: `${BASE_PATH}/wedding/vendors`,
  VENDOR: id => `${BASE_PATH}/wedding/vendors/${id}`,
  VENDOR_SECTIONS: id => `${BASE_PATH}/wedding/vendors/${id}/sections`,
  VENDOR_STATS: id => `${BASE_PATH}/wedding/vendors/${id}/stats`,
  FEATURED_VENDORS: `${BASE_PATH}/wedding/vendors/featured`,
  SEARCH_VENDORS: `${BASE_PATH}/wedding/vendors/search`,
  VENDORS_BY_LOCATION: `${BASE_PATH}/wedding/vendors/location`,
  BOOKINGS: `${BASE_PATH}/wedding/bookings`,
  BOOKING: bookingId => `${BASE_PATH}/wedding/bookings/${bookingId}`,
  VENDOR_BOOKINGS: vendorId =>
    `${BASE_PATH}/wedding/vendors/${vendorId}/bookings`,
  USER_BOOKINGS: userId => `${BASE_PATH}/wedding/users/${userId}/bookings`,
  WEBSITE_TEMPLATES: `${BASE_PATH}/wedding/templates`,
  SECTIONS: `${BASE_PATH}/wedding/sections`,
  CREATE_WEBSITE: `${BASE_PATH}/wedding/website`,
};

// Automobile endpoints (if needed in future)
export const AUTOMOBILE_ENDPOINTS = {
  BASE: `${BASE_PATH}/automobiles`,
  VEHICLES: `${BASE_PATH}/automobiles/vehicles`,
  VEHICLE: id => `${BASE_PATH}/automobiles/vehicles/${id}`,
  CATEGORIES: `${BASE_PATH}/automobiles/categories`,
  DEALERS: `${BASE_PATH}/automobiles/dealers`,
  DEALER: id => `${BASE_PATH}/automobiles/dealers/${id}`,
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
