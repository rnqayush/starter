import { apiRequest, handleApiResponse, handleApiError } from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

class AutomobileService {
  // Get all vehicles with pagination and filters
  async getVehicles(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vehicle by ID
  async getVehicleById(id) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.BY_ID(id));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Create new vehicle (vendor only)
  async createVehicle(vehicleData) {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.AUTOMOBILE.CREATE, vehicleData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Update vehicle (vendor only)
  async updateVehicle(id, vehicleData) {
    try {
      const response = await apiRequest.put(API_ENDPOINTS.AUTOMOBILE.UPDATE(id), vehicleData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Delete vehicle (vendor only)
  async deleteVehicle(id) {
    try {
      const response = await apiRequest.delete(API_ENDPOINTS.AUTOMOBILE.DELETE(id));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vendor's vehicles
  async getVendorVehicles(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.VENDOR_VEHICLES, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Search vehicles
  async searchVehicles(searchParams) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { 
        params: { ...searchParams, search: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vehicles by type
  async getVehiclesByType(type, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { 
        params: { ...params, type } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vehicles by brand
  async getVehiclesByBrand(brand, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { 
        params: { ...params, brand } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vehicles by price range
  async getVehiclesByPriceRange(minPrice, maxPrice, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { 
        params: { ...params, minPrice, maxPrice } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vehicles by year range
  async getVehiclesByYearRange(minYear, maxYear, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { 
        params: { ...params, minYear, maxYear } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vehicles by fuel type
  async getVehiclesByFuelType(fuelType, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { 
        params: { ...params, fuelType } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vehicles by transmission
  async getVehiclesByTransmission(transmission, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { 
        params: { ...params, transmission } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get featured vehicles
  async getFeaturedVehicles(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { 
        params: { ...params, featured: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vehicles by location
  async getVehiclesByLocation(location, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.AUTOMOBILE.LIST, { 
        params: { ...params, location } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// Create and export singleton instance
const automobileService = new AutomobileService();
export default automobileService;

