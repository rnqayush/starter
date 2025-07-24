import { apiRequest, handleApiResponse, handleApiError } from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

class AdminService {
  // Get admin dashboard data
  async getDashboardData() {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.DASHBOARD);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get all vendors with pagination and filters
  async getVendors(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.VENDORS, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Approve vendor
  async approveVendor(vendorId) {
    try {
      const response = await apiRequest.put(API_ENDPOINTS.ADMIN.APPROVE_VENDOR(vendorId));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Reject vendor
  async rejectVendor(vendorId, reason = '') {
    try {
      const response = await apiRequest.put(API_ENDPOINTS.ADMIN.REJECT_VENDOR(vendorId), { reason });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Delete vendor
  async deleteVendor(vendorId) {
    try {
      const response = await apiRequest.delete(API_ENDPOINTS.ADMIN.DELETE_VENDOR(vendorId));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get all users with pagination and filters
  async getUsers(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.USERS, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get pending vendors
  async getPendingVendors(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.VENDORS, { 
        params: { ...params, status: 'pending' } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get approved vendors
  async getApprovedVendors(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.VENDORS, { 
        params: { ...params, status: 'approved' } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get rejected vendors
  async getRejectedVendors(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.VENDORS, { 
        params: { ...params, status: 'rejected' } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Search vendors
  async searchVendors(searchTerm, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.VENDORS, { 
        params: { ...params, search: searchTerm } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vendors by category
  async getVendorsByCategory(category, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.VENDORS, { 
        params: { ...params, category } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get platform statistics
  async getPlatformStats() {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ADMIN.DASHBOARD);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// Create and export singleton instance
const adminService = new AdminService();
export default adminService;

