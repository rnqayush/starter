import { apiRequest, handleApiResponse, handleApiError } from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

class HotelService {
  // Get all hotels with pagination and filters
  async getHotels(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOTEL.LIST, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get hotel by ID
  async getHotelById(id) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOTEL.BY_ID(id));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Create new hotel (vendor only)
  async createHotel(hotelData) {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.HOTEL.CREATE, hotelData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Update hotel (vendor only)
  async updateHotel(id, hotelData) {
    try {
      const response = await apiRequest.put(API_ENDPOINTS.HOTEL.UPDATE(id), hotelData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Delete hotel (vendor only)
  async deleteHotel(id) {
    try {
      const response = await apiRequest.delete(API_ENDPOINTS.HOTEL.DELETE(id));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vendor's hotels
  async getVendorHotels(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOTEL.VENDOR_HOTELS, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Search hotels
  async searchHotels(searchParams) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOTEL.LIST, { 
        params: { ...searchParams, search: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get hotels by location
  async getHotelsByLocation(location, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOTEL.LIST, { 
        params: { ...params, location } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get hotels by price range
  async getHotelsByPriceRange(minPrice, maxPrice, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOTEL.LIST, { 
        params: { ...params, minPrice, maxPrice } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get hotels by amenities
  async getHotelsByAmenities(amenities, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOTEL.LIST, { 
        params: { ...params, amenities: amenities.join(',') } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get featured hotels
  async getFeaturedHotels(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOTEL.LIST, { 
        params: { ...params, featured: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// Create and export singleton instance
const hotelService = new HotelService();
export default hotelService;

