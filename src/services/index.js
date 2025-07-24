// Export all services
export { default as authService } from './authService';
export { default as hotelService } from './hotelService';
export { default as ecommerceService } from './ecommerceService';
export { default as automobileService } from './automobileService';
export { default as weddingService } from './weddingService';
export { default as adminService } from './adminService';
export { default as homepageService } from './homepageService';

// Export API client utilities
export { 
  apiRequest, 
  handleApiResponse, 
  handleApiError, 
  setAuthToken, 
  clearAuthData,
  uploadFile 
} from './apiClient';

