import { apiRequest, handleApiResponse, handleApiError } from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

class HomepageService {
  // Get homepage content
  async getHomepageContent() {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOMEPAGE.CONTENT);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get platform statistics
  async getPlatformStats() {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOMEPAGE.STATS);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Global search across all categories
  async globalSearch(searchParams) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOMEPAGE.SEARCH, { params: searchParams });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get featured content for homepage
  async getFeaturedContent() {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOMEPAGE.CONTENT, { 
        params: { featured: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get recent listings
  async getRecentListings(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOMEPAGE.CONTENT, { 
        params: { ...params, recent: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get popular categories
  async getPopularCategories() {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOMEPAGE.STATS, { 
        params: { type: 'categories' } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get top vendors
  async getTopVendors(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.HOMEPAGE.CONTENT, { 
        params: { ...params, topVendors: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// Create and export singleton instance
const homepageService = new HomepageService();
export default homepageService;

