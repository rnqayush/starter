// Website service
// Handles all website-related API calls

import httpClient from '../client/httpClient';
import { WEBSITE_ENDPOINTS } from '../config/endpoints';

class WebsiteService {
  // Create website from start-building form
  async createFromStartBuilding(websiteData) {
    try {
      const response = await httpClient.post(WEBSITE_ENDPOINTS.CREATE_FROM_START_BUILDING, websiteData);

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Website created successfully',
        };
      }

      throw new Error(response.data?.message || 'Website creation failed');
    } catch (error) {
      console.error('Create website from start-building error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Website creation failed',
      };
    }
  }

  // Check website name availability
  async checkAvailability(websiteName) {
    try {
      const response = await httpClient.get(WEBSITE_ENDPOINTS.CHECK_AVAILABILITY(websiteName));

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      throw new Error(response.data?.message || 'Availability check failed');
    } catch (error) {
      console.error('Check website availability error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Availability check failed',
      };
    }
  }

  // Get website by name
  async getByName(websiteName) {
    try {
      const response = await httpClient.get(WEBSITE_ENDPOINTS.BY_NAME(websiteName));

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      throw new Error(response.data?.message || 'Website not found');
    } catch (error) {
      console.error('Get website by name error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to get website',
      };
    }
  }

  // Get user's websites
  async getUserWebsites() {
    try {
      const response = await httpClient.get(WEBSITE_ENDPOINTS.USER_WEBSITES);

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      throw new Error(response.data?.message || 'Failed to get user websites');
    } catch (error) {
      console.error('Get user websites error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to get user websites',
      };
    }
  }

  // Update website
  async update(websiteName, updateData) {
    try {
      const response = await httpClient.put(WEBSITE_ENDPOINTS.BY_NAME(websiteName), updateData);

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Website updated successfully',
        };
      }

      throw new Error(response.data?.message || 'Website update failed');
    } catch (error) {
      console.error('Update website error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Website update failed',
      };
    }
  }

  // Delete website
  async delete(websiteName) {
    try {
      const response = await httpClient.delete(WEBSITE_ENDPOINTS.BY_NAME(websiteName));

      if (response.data?.status === 'success') {
        return {
          success: true,
          message: response.data.message || 'Website deleted successfully',
        };
      }

      throw new Error(response.data?.message || 'Website deletion failed');
    } catch (error) {
      console.error('Delete website error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Website deletion failed',
      };
    }
  }

  // Get website analytics
  async getAnalytics(websiteName) {
    try {
      const response = await httpClient.get(WEBSITE_ENDPOINTS.ANALYTICS(websiteName));

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      throw new Error(response.data?.message || 'Failed to get analytics');
    } catch (error) {
      console.error('Get website analytics error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to get analytics',
      };
    }
  }
}

// Create and export singleton instance
const websiteService = new WebsiteService();

export { WebsiteService };
export default websiteService;
