// Wedding service
// Handles all wedding-related API calls

import httpClient from '../client/httpClient';
import { WEDDING_ENDPOINTS, buildUrlWithParams } from '../config/endpoints';
import { FEATURE_FLAGS } from '../config/config';

// Import dummy data for development/mocking
import weddingData from '../../DummyData/wedding.json';

class WeddingService {
  constructor() {
    this.mockMode = FEATURE_FLAGS.enableMocking;
  }

  // Helper function to simulate network delay
  _simulateDelay(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Helper function to create API response structure
  _createAPIResponse(data, success = true, message = '') {
    return {
      success,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  // Extract data from the JSON response structure
  _getWeddingData() {
    if (weddingData.status === 'success' && weddingData.data) {
      return weddingData.data;
    }
    throw new Error('Failed to load wedding data');
  }

  // Convert vendors object to array for backward compatibility
  _convertVendorsToArray(vendorsObject) {
    if (!vendorsObject || typeof vendorsObject !== 'object') {
      return [];
    }
    return Object.values(vendorsObject);
  }

  // Get static vendor data from JSON (converted to array for compatibility)
  getStaticWeddingVendors() {
    try {
      const data = this._getWeddingData();
      if (Array.isArray(data.vendors)) {
        return data.vendors;
      } else if (data.vendors && typeof data.vendors === 'object') {
        return this._convertVendorsToArray(data.vendors);
      }
      return [];
    } catch (error) {
      console.error('Error loading wedding vendors:', error);
      return [];
    }
  }

  // Get vendors object (new format)
  getVendorsObject() {
    try {
      const data = this._getWeddingData();
      if (
        data.vendors &&
        typeof data.vendors === 'object' &&
        !Array.isArray(data.vendors)
      ) {
        return data.vendors;
      } else if (Array.isArray(data.vendors)) {
        const vendorsObj = {};
        data.vendors.forEach(vendor => {
          if (vendor.id) {
            vendorsObj[vendor.id] = vendor;
          }
        });
        return vendorsObj;
      }
      return {};
    } catch (error) {
      console.error('Error loading vendors object:', error);
      return {};
    }
  }

  // Get sections configuration
  getSections() {
    try {
      const data = this._getWeddingData();
      return data.sections || {};
    } catch (error) {
      console.error('Error loading sections:', error);
      return {};
    }
  }

  // Get website templates
  getWebsiteTemplates() {
    try {
      const data = this._getWeddingData();
      return data.websiteTemplates || {};
    } catch (error) {
      console.error('Error loading website templates:', error);
      return {};
    }
  }

  // Get default section order
  getDefaultSectionOrder() {
    try {
      const data = this._getWeddingData();
      return (
        data.defaultSectionOrder || [
          'hero',
          'about-us',
          'services-offered',
          'recent-work',
          'gallery',
          'packages-pricing',
          'testimonials',
          'faq',
          'contact',
          'footer',
        ]
      );
    } catch (error) {
      console.error('Error loading default section order:', error);
      return [
        'hero',
        'about-us',
        'services-offered',
        'recent-work',
        'gallery',
        'packages-pricing',
        'testimonials',
        'faq',
        'contact',
        'footer',
      ];
    }
  }

  // Get default section visibility
  getDefaultSectionVisibility() {
    try {
      const data = this._getWeddingData();
      return (
        data.defaultSectionVisibility || {
          hero: true,
          'about-us': true,
          'services-offered': true,
          'recent-work': true,
          gallery: true,
          'packages-pricing': true,
          testimonials: true,
          faq: true,
          contact: true,
          footer: true,
        }
      );
    } catch (error) {
      console.error('Error loading default section visibility:', error);
      return {
        hero: true,
        'about-us': true,
        'services-offered': true,
        'recent-work': true,
        gallery: true,
        'packages-pricing': true,
        testimonials: true,
        faq: true,
        contact: true,
        footer: true,
      };
    }
  }

  // Get static bookings data from JSON
  getStaticWeddingBookings() {
    try {
      const data = this._getWeddingData();
      return data.bookings || [];
    } catch (error) {
      console.error('Error loading wedding bookings:', error);
      return [];
    }
  }

  // Get all vendors
  async getWeddingVendors() {
    try {
      if (this.mockMode) {
        await this._simulateDelay();
        const data = this._getWeddingData();
        return this._createAPIResponse(
          this._convertVendorsToArray(data.vendors) || []
        );
      }

      const response = await httpClient.get(WEDDING_ENDPOINTS.VENDORS);
      return response.data;
    } catch (error) {
      return this._createAPIResponse([], false, error.message);
    }
  }

  // Get vendor by ID
  getVendorById(id) {
    try {
      const data = this._getWeddingData();

      // Try object format first (new format)
      if (
        data.vendors &&
        typeof data.vendors === 'object' &&
        !Array.isArray(data.vendors)
      ) {
        return data.vendors[id] || null;
      }

      // Fallback to array format (old format)
      if (Array.isArray(data.vendors)) {
        return data.vendors.find(vendor => vendor.id === id) || null;
      }

      return null;
    } catch (error) {
      console.error('Error finding vendor by ID:', error);
      return null;
    }
  }

  // Get vendor by ID (async version)
  async getVendorByIdAsync(id) {
    try {
      if (this.mockMode) {
        await this._simulateDelay();
        return this.getVendorById(id);
      }

      const response = await httpClient.get(WEDDING_ENDPOINTS.VENDOR(id));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch vendor: ${error.message}`);
    }
  }

  // Get vendors by location
  getVendorsByLocation(city, state) {
    try {
      const vendors = this.getStaticWeddingVendors();
      return vendors.filter(
        vendor =>
          vendor.city &&
          vendor.state &&
          vendor.city.toLowerCase() === city.toLowerCase() &&
          vendor.state.toLowerCase() === state.toLowerCase()
      );
    } catch (error) {
      console.error('Error finding vendors by location:', error);
      return [];
    }
  }

  // Get vendors by location (async version)
  async getVendorsByLocationAsync(city, state) {
    try {
      if (this.mockMode) {
        await this._simulateDelay();
        return this.getVendorsByLocation(city, state);
      }

      const url = buildUrlWithParams(WEDDING_ENDPOINTS.VENDORS_BY_LOCATION, {
        city,
        state,
      });
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch vendors by location: ${error.message}`);
    }
  }

  // Get featured vendors
  getFeaturedVendors() {
    try {
      const vendors = this.getStaticWeddingVendors();
      return vendors.filter(vendor => vendor.featured);
    } catch (error) {
      console.error('Error finding featured vendors:', error);
      return [];
    }
  }

  // Get featured vendors (async version)
  async getFeaturedVendorsAsync() {
    try {
      if (this.mockMode) {
        await this._simulateDelay();
        return this.getFeaturedVendors();
      }

      const response = await httpClient.get(WEDDING_ENDPOINTS.FEATURED_VENDORS);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch featured vendors: ${error.message}`);
    }
  }

  // Search vendors
  searchVendors(query) {
    try {
      const vendors = this.getStaticWeddingVendors();
      const searchTerm = query.toLowerCase();
      return vendors.filter(
        vendor =>
          (vendor.name && vendor.name.toLowerCase().includes(searchTerm)) ||
          (vendor.specialties &&
            vendor.specialties.some(specialty =>
              specialty.toLowerCase().includes(searchTerm)
            )) ||
          (vendor.description &&
            vendor.description.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Error searching vendors:', error);
      return [];
    }
  }

  // Search vendors (async version)
  async searchVendorsAsync(query) {
    try {
      if (this.mockMode) {
        await this._simulateDelay();
        return this.searchVendors(query);
      }

      const url = buildUrlWithParams(WEDDING_ENDPOINTS.SEARCH_VENDORS, {
        q: query,
      });
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search vendors: ${error.message}`);
    }
  }

  // Get all bookings
  async getWeddingBookings() {
    try {
      if (this.mockMode) {
        await this._simulateDelay();
        const data = this._getWeddingData();
        return this._createAPIResponse(data.bookings || []);
      }

      const response = await httpClient.get(WEDDING_ENDPOINTS.BOOKINGS);
      return response.data;
    } catch (error) {
      return this._createAPIResponse([], false, error.message);
    }
  }

  // Get bookings by vendor ID
  getBookingsByVendorId(vendorId) {
    try {
      const bookings = this.getStaticWeddingBookings();
      return bookings.filter(booking => booking.vendorId === vendorId);
    } catch (error) {
      console.error('Error finding bookings by vendor ID:', error);
      return [];
    }
  }

  // Get bookings by user ID
  getBookingsByUserId(userId) {
    try {
      const bookings = this.getStaticWeddingBookings();
      return bookings.filter(booking => booking.userId === userId);
    } catch (error) {
      console.error('Error finding bookings by user ID:', error);
      return [];
    }
  }

  // Create booking
  async createBooking(bookingData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(500);
        const newBooking = {
          id: `booking-${Date.now()}`,
          ...bookingData,
          bookingDate: new Date().toISOString().split('T')[0],
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        return this._createAPIResponse(
          newBooking,
          true,
          'Booking created successfully'
        );
      }

      const response = await httpClient.post(
        WEDDING_ENDPOINTS.BOOKINGS,
        bookingData
      );
      return response.data;
    } catch (error) {
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Update vendor
  async updateVendor(vendorId, updateData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);
        const vendor = this.getVendorById(vendorId);
        if (!vendor) {
          throw new Error('Vendor not found');
        }

        const updatedVendor = {
          ...vendor,
          ...updateData,
          updatedAt: new Date().toISOString(),
        };

        return this._createAPIResponse(
          updatedVendor,
          true,
          'Vendor updated successfully'
        );
      }

      const response = await httpClient.put(
        WEDDING_ENDPOINTS.VENDOR(vendorId),
        updateData
      );
      return response.data;
    } catch (error) {
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Update vendor sections
  async updateVendorSections(vendorId, sectionsData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);
        const vendor = this.getVendorById(vendorId);
        if (!vendor) {
          throw new Error('Vendor not found');
        }

        const updatedVendor = {
          ...vendor,
          ...sectionsData,
          updatedAt: new Date().toISOString(),
        };

        return this._createAPIResponse(
          updatedVendor,
          true,
          'Vendor sections updated successfully'
        );
      }

      const response = await httpClient.put(
        WEDDING_ENDPOINTS.VENDOR_SECTIONS(vendorId),
        sectionsData
      );
      return response.data;
    } catch (error) {
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Get vendor statistics
  async getVendorStats(vendorId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay();
        const vendor = this.getVendorById(vendorId);
        const bookings = this.getBookingsByVendorId(vendorId);

        if (!vendor) {
          throw new Error('Vendor not found');
        }

        const stats = {
          vendorId,
          totalBookings: bookings.length,
          confirmedBookings: bookings.filter(b => b.status === 'confirmed')
            .length,
          pendingBookings: bookings.filter(b => b.status === 'pending').length,
          totalRevenue: bookings
            .filter(b => b.status === 'confirmed')
            .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
          rating: vendor.rating,
          reviewCount: vendor.reviewCount,
        };

        return this._createAPIResponse(stats, true);
      }

      const response = await httpClient.get(
        WEDDING_ENDPOINTS.VENDOR_STATS(vendorId)
      );
      return response.data;
    } catch (error) {
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Create a new wedding website
  async createWeddingWebsite(vendorData, templateId = 'default') {
    try {
      if (this.mockMode) {
        await this._simulateDelay(500);
        const templates = this.getWebsiteTemplates();
        const template = templates[templateId] || templates['default'];
        const sections = this.getSections();

        const newVendor = {
          id: vendorData.id || `vendor-${Date.now()}`,
          ...vendorData,
          sectionOrder: template.sections || this.getDefaultSectionOrder(),
          sectionVisibility: this.getDefaultSectionVisibility(),
          theme: template.theme || {
            primaryColor: '#db2777',
            secondaryColor: '#f472b6',
            backgroundColor: '#fdf2f8',
            textColor: '#1f2937',
          },
          sections: template.sections.reduce((acc, sectionId) => {
            if (sections[sectionId]) {
              acc[sectionId] = {
                ...sections[sectionId],
                enabled: true,
                customContent: {},
              };
            }
            return acc;
          }, {}),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        return this._createAPIResponse(
          newVendor,
          true,
          'Wedding website created successfully'
        );
      }

      const response = await httpClient.post(WEDDING_ENDPOINTS.CREATE_WEBSITE, {
        vendorData,
        templateId,
      });
      return response.data;
    } catch (error) {
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Toggle mock mode
  setMockMode(enabled) {
    this.mockMode = enabled;
  }
}

// Create and export singleton instance
const weddingService = new WeddingService();

// Legacy compatibility exports
export const weddingVendors = weddingService.getStaticWeddingVendors();
export const getWeddingVendorById =
  weddingService.getVendorById.bind(weddingService);
export const getWeddingFeaturedVendors =
  weddingService.getFeaturedVendors.bind(weddingService);
export const getWeddingVendorsByLocation =
  weddingService.getVendorsByLocation.bind(weddingService);
export const searchWeddingVendors =
  weddingService.searchVendors.bind(weddingService);

export { WeddingService };
export default weddingService;
