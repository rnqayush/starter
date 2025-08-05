// Hotel service
// Handles all hotel-related API calls

import httpClient from '../client/httpClient';
import { HOTEL_ENDPOINTS } from '../config/endpoints';

class HotelService {
  // Get hotel by identifier (ID, slug, or website name)
  async getHotel(identifier) {
    try {
      const response = await httpClient.get(
        HOTEL_ENDPOINTS.HOTEL(identifier)
      );

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Hotel data retrieved successfully',
        };
      }

      throw new Error(response.data?.message || 'Hotel not found');
    } catch (error) {
      console.error('Get hotel error:', error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to get hotel data',
      };
    }
  }

  // Get hotel rooms
  async getHotelRooms(identifier) {
    try {
      const response = await httpClient.get(
        HOTEL_ENDPOINTS.ROOMS(identifier)
      );

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Hotel rooms retrieved successfully',
        };
      }

      throw new Error(response.data?.message || 'Hotel rooms not found');
    } catch (error) {
      console.error('Get hotel rooms error:', error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to get hotel rooms',
      };
    }
  }

  // Get all hotels
  async getAllHotels(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add query parameters if provided
      if (params.city) queryParams.append('city', params.city);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.offset) queryParams.append('offset', params.offset);

      const url = queryParams.toString() 
        ? `${HOTEL_ENDPOINTS.BASE}?${queryParams.toString()}`
        : HOTEL_ENDPOINTS.BASE;

      const response = await httpClient.get(url);

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Hotels retrieved successfully',
        };
      }

      throw new Error(response.data?.message || 'Failed to get hotels');
    } catch (error) {
      console.error('Get all hotels error:', error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to get hotels',
      };
    }
  }

  // Create hotel from start-building (if needed)
  async createFromStartBuilding(hotelData) {
    try {
      const response = await httpClient.post(
        HOTEL_ENDPOINTS.START_BUILDING,
        hotelData
      );

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Hotel created successfully',
        };
      }

      throw new Error(response.data?.message || 'Hotel creation failed');
    } catch (error) {
      console.error('Create hotel from start-building error:', error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Hotel creation failed',
      };
    }
  }
}

// Create and export singleton instance
const hotelService = new HotelService();

export { HotelService };
export default hotelService;

