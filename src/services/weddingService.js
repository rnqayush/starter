import { apiRequest, handleApiResponse, handleApiError } from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

class WeddingService {
  // Get all wedding services with pagination and filters
  async getWeddingServices(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.LIST, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get wedding service by ID
  async getWeddingServiceById(id) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.BY_ID(id));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Create new wedding service (vendor only)
  async createWeddingService(serviceData) {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.WEDDING.CREATE, serviceData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Update wedding service (vendor only)
  async updateWeddingService(id, serviceData) {
    try {
      const response = await apiRequest.put(API_ENDPOINTS.WEDDING.UPDATE(id), serviceData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Delete wedding service (vendor only)
  async deleteWeddingService(id) {
    try {
      const response = await apiRequest.delete(API_ENDPOINTS.WEDDING.DELETE(id));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vendor's wedding services
  async getVendorWeddingServices(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.VENDOR_SERVICES, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Search wedding services
  async searchWeddingServices(searchParams) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.LIST, { 
        params: { ...searchParams, search: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get services by category
  async getServicesByCategory(category, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.LIST, { 
        params: { ...params, category } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get services by location
  async getServicesByLocation(location, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.LIST, { 
        params: { ...params, location } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get services by price range
  async getServicesByPriceRange(minPrice, maxPrice, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.LIST, { 
        params: { ...params, minPrice, maxPrice } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get services by event type
  async getServicesByEventType(eventType, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.LIST, { 
        params: { ...params, eventType } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get featured services
  async getFeaturedServices(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.LIST, { 
        params: { ...params, featured: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get services by vendor rating
  async getServicesByRating(minRating, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.LIST, { 
        params: { ...params, minRating } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get services by availability
  async getServicesByAvailability(date, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.WEDDING.LIST, { 
        params: { ...params, availableDate: date } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// Create and export singleton instance
const weddingService = new WeddingService();
export default weddingService;

