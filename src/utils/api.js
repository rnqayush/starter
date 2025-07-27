// Real API service to connect to the backend
// Base URL for the backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// =============================================================================
// HOTEL API METHODS
// =============================================================================

export const hotelAPI = {
  // Get all hotels
  getAllHotels: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/hotel${queryString ? `?${queryString}` : ''}`;
    return apiRequest(endpoint);
  },

  // Get hotel by ID
  getHotelById: async (id) => {
    return apiRequest(`/hotel/${id}`);
  },

  // Create new hotel (requires auth)
  createHotel: async (hotelData) => {
    return apiRequest('/hotel', {
      method: 'POST',
      body: JSON.stringify(hotelData),
    });
  },

  // Update hotel (requires auth)
  updateHotel: async (id, hotelData) => {
    return apiRequest(`/hotel/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hotelData),
    });
  },

  // Delete hotel (requires auth)
  deleteHotel: async (id) => {
    return apiRequest(`/hotel/${id}`, {
      method: 'DELETE',
    });
  },

  // Get vendor's hotels (requires auth)
  getVendorHotels: async () => {
    return apiRequest('/hotel/vendor/my-hotels');
  },

  // Get hotel stats (requires auth)
  getHotelStats: async () => {
    return apiRequest('/hotel/vendor/stats');
  },
};

// =============================================================================
// AUTOMOBILE API METHODS
// =============================================================================

export const automobileAPI = {
  // Get all vehicles
  getAllVehicles: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/automobile${queryString ? `?${queryString}` : ''}`;
    return apiRequest(endpoint);
  },

  // Get vehicle by ID
  getVehicleById: async (id) => {
    return apiRequest(`/automobile/${id}`);
  },

  // Create new vehicle (requires auth)
  createVehicle: async (vehicleData) => {
    return apiRequest('/automobile', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    });
  },

  // Update vehicle (requires auth)
  updateVehicle: async (id, vehicleData) => {
    return apiRequest(`/automobile/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    });
  },

  // Delete vehicle (requires auth)
  deleteVehicle: async (id) => {
    return apiRequest(`/automobile/${id}`, {
      method: 'DELETE',
    });
  },

  // Get vendor's vehicles (requires auth)
  getVendorVehicles: async () => {
    return apiRequest('/automobile/vendor/my-vehicles');
  },
};

// =============================================================================
// ECOMMERCE API METHODS
// =============================================================================

export const ecommerceAPI = {
  // Get all products
  getAllProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/ecommerce${queryString ? `?${queryString}` : ''}`;
    return apiRequest(endpoint);
  },

  // Get product by ID
  getProductById: async (id) => {
    return apiRequest(`/ecommerce/${id}`);
  },

  // Create new product (requires auth)
  createProduct: async (productData) => {
    return apiRequest('/ecommerce', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update product (requires auth)
  updateProduct: async (id, productData) => {
    return apiRequest(`/ecommerce/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Delete product (requires auth)
  deleteProduct: async (id) => {
    return apiRequest(`/ecommerce/${id}`, {
      method: 'DELETE',
    });
  },

  // Get vendor's products (requires auth)
  getVendorProducts: async () => {
    return apiRequest('/ecommerce/vendor/my-products');
  },
};

// =============================================================================
// WEDDING API METHODS
// =============================================================================

export const weddingAPI = {
  // Get all wedding services
  getAllWeddingServices: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/wedding${queryString ? `?${queryString}` : ''}`;
    return apiRequest(endpoint);
  },

  // Get wedding service by ID
  getWeddingServiceById: async (id) => {
    return apiRequest(`/wedding/${id}`);
  },

  // Create new wedding service (requires auth)
  createWeddingService: async (serviceData) => {
    return apiRequest('/wedding', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  },

  // Update wedding service (requires auth)
  updateWeddingService: async (id, serviceData) => {
    return apiRequest(`/wedding/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  },

  // Delete wedding service (requires auth)
  deleteWeddingService: async (id) => {
    return apiRequest(`/wedding/${id}`, {
      method: 'DELETE',
    });
  },

  // Get vendor's wedding services (requires auth)
  getVendorWeddingServices: async () => {
    return apiRequest('/wedding/vendor/my-services');
  },

  // Testimonials management
  addTestimonial: async (serviceId, testimonialData) => {
    return apiRequest(`/wedding/${serviceId}/testimonials`, {
      method: 'POST',
      body: JSON.stringify(testimonialData),
    });
  },

  updateTestimonial: async (serviceId, testimonialId, testimonialData) => {
    return apiRequest(`/wedding/${serviceId}/testimonials/${testimonialId}`, {
      method: 'PUT',
      body: JSON.stringify(testimonialData),
    });
  },

  deleteTestimonial: async (serviceId, testimonialId) => {
    return apiRequest(`/wedding/${serviceId}/testimonials/${testimonialId}`, {
      method: 'DELETE',
    });
  },

  // FAQ management
  addFAQ: async (serviceId, faqData) => {
    return apiRequest(`/wedding/${serviceId}/faqs`, {
      method: 'POST',
      body: JSON.stringify(faqData),
    });
  },

  updateFAQ: async (serviceId, faqId, faqData) => {
    return apiRequest(`/wedding/${serviceId}/faqs/${faqId}`, {
      method: 'PUT',
      body: JSON.stringify(faqData),
    });
  },

  deleteFAQ: async (serviceId, faqId) => {
    return apiRequest(`/wedding/${serviceId}/faqs/${faqId}`, {
      method: 'DELETE',
    });
  },

  // Offers management
  addOffer: async (serviceId, offerData) => {
    return apiRequest(`/wedding/${serviceId}/offers`, {
      method: 'POST',
      body: JSON.stringify(offerData),
    });
  },

  updateOffer: async (serviceId, offerId, offerData) => {
    return apiRequest(`/wedding/${serviceId}/offers/${offerId}`, {
      method: 'PUT',
      body: JSON.stringify(offerData),
    });
  },

  deleteOffer: async (serviceId, offerId) => {
    return apiRequest(`/wedding/${serviceId}/offers/${offerId}`, {
      method: 'DELETE',
    });
  },
};

// =============================================================================
// BUSINESS API METHODS
// =============================================================================

export const businessAPI = {
  // Get all businesses
  getAllBusinesses: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/business${queryString ? `?${queryString}` : ''}`;
    return apiRequest(endpoint);
  },

  // Get business by vendor ID
  getBusinessByVendor: async (vendorId) => {
    return apiRequest(`/business/vendor/${vendorId}`);
  },

  // Get my business (requires auth)
  getMyBusiness: async () => {
    return apiRequest('/business/my-business');
  },

  // Create new business (requires auth)
  createBusiness: async (businessData) => {
    return apiRequest('/business', {
      method: 'POST',
      body: JSON.stringify(businessData),
    });
  },

  // Update business (requires auth)
  updateBusiness: async (id, businessData) => {
    return apiRequest(`/business/${id}`, {
      method: 'PUT',
      body: JSON.stringify(businessData),
    });
  },

  // Delete business (requires auth)
  deleteBusiness: async (id) => {
    return apiRequest(`/business/${id}`, {
      method: 'DELETE',
    });
  },

  // Update business section (requires auth)
  updateBusinessSection: async (id, sectionName, sectionData) => {
    return apiRequest(`/business/${id}/section/${sectionName}`, {
      method: 'PUT',
      body: JSON.stringify(sectionData),
    });
  },

  // Services management
  addService: async (businessId, serviceData) => {
    return apiRequest(`/business/${businessId}/services`, {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  },

  updateService: async (businessId, serviceId, serviceData) => {
    return apiRequest(`/business/${businessId}/services/${serviceId}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  },

  deleteService: async (businessId, serviceId) => {
    return apiRequest(`/business/${businessId}/services/${serviceId}`, {
      method: 'DELETE',
    });
  },

  // Team management
  addTeamMember: async (businessId, memberData) => {
    return apiRequest(`/business/${businessId}/team`, {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  },

  updateTeamMember: async (businessId, memberId, memberData) => {
    return apiRequest(`/business/${businessId}/team/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    });
  },

  deleteTeamMember: async (businessId, memberId) => {
    return apiRequest(`/business/${businessId}/team/${memberId}`, {
      method: 'DELETE',
    });
  },

  // Gallery management
  addGalleryItem: async (businessId, galleryData) => {
    return apiRequest(`/business/${businessId}/gallery`, {
      method: 'POST',
      body: JSON.stringify(galleryData),
    });
  },

  deleteGalleryItem: async (businessId, type, itemId) => {
    return apiRequest(`/business/${businessId}/gallery/${type}/${itemId}`, {
      method: 'DELETE',
    });
  },

  // Publish/Unpublish
  togglePublishBusiness: async (businessId) => {
    return apiRequest(`/business/${businessId}/publish`, {
      method: 'PUT',
    });
  },
};

// =============================================================================
// AUTH API METHODS
// =============================================================================

export const authAPI = {
  // Login
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Register
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Logout
  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  // Get current user profile
  getProfile: async () => {
    return apiRequest('/auth/profile');
  },

  // Update profile
  updateProfile: async (profileData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Refresh token
  refreshToken: async () => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
    });
  },
};

// =============================================================================
// GENERAL API METHODS
// =============================================================================

export const generalAPI = {
  // Health check
  healthCheck: async () => {
    return apiRequest('/');
  },

  // Test endpoint
  test: async () => {
    return apiRequest('/test');
  },
};

// =============================================================================
// COMBINED API OBJECT
// =============================================================================

const API = {
  hotel: hotelAPI,
  automobile: automobileAPI,
  ecommerce: ecommerceAPI,
  wedding: weddingAPI,
  business: businessAPI,
  auth: authAPI,
  general: generalAPI,
};

export default API;

