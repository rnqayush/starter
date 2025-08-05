// Business service
// Handles all business/portfolio-related API calls

import httpClient from '../client/httpClient';
import { BUSINESS_ENDPOINTS } from '../config/endpoints';
import { FEATURE_FLAGS } from '../config/config';

// Import dummy data for development/mocking
import businessData from '../../DummyData/business.json';

class BusinessService {
  constructor() {
    this.mockMode = FEATURE_FLAGS.enableMocking;
  }

  // Helper function to get business data by slug (for mocking)
  _getBusinessDataBySlug(slug) {
    if (slug === 'salon' || slug === 'business') {
      return businessData.data?.portfolio?.buisness || null;
    }
    if (slug === 'freelancer' || slug === 'personal') {
      return businessData.data?.portfolio?.personal || null;
    }
    return null;
  }

  // Helper function to simulate network delay
  _simulateDelay(ms = 500) {
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

  // Get business type configuration
  getBusinessTypeConfig(businessType) {
    const configs = {
      freelancer: {
        features: {
          showPortfolio: true,
          showSkills: true,
          showExperience: true,
          showTeam: false,
          showGallery: false,
          showPackages: true,
        },
        hiddenSections: ['team', 'gallery'],
      },
      business: {
        features: {
          showPortfolio: false,
          showSkills: false,
          showExperience: false,
          showTeam: true,
          showGallery: true,
          showPackages: true,
        },
        hiddenSections: ['portfolio', 'skills', 'experience'],
      },
    };

    return configs[businessType] || configs.business;
  }

  // Detect business type from slug and return enhanced data
  detectBusinessType(businessSlug) {
    const business = this._getBusinessDataBySlug(businessSlug);
    if (!business) return null;

    let businessType = business.type || 'business';
    if (businessSlug === 'freelancer' || businessSlug === 'personal') {
      businessType = 'freelancer';
    } else if (businessSlug === 'salon' || businessSlug === 'business') {
      businessType = 'business';
    }

    const businessTypeConfig = this.getBusinessTypeConfig(businessType);

    return {
      businessData: business,
      businessType,
      businessTypeConfig,
      isFreelancer: businessType === 'freelancer',
      isBusiness: businessType === 'business',
    };
  }

  // Fetch business data
  async fetchBusinessData(businessSlug) {
    try {
      if (this.mockMode) {
        console.log(`[MOCK API] Fetching business data for: ${businessSlug}`);
        await this._simulateDelay(300);

        const businessInfo = this.detectBusinessType(businessSlug);

        if (!businessInfo) {
          throw new Error(`Business with slug "${businessSlug}" not found`);
        }

        console.log(
          `[MOCK API] Successfully fetched data for: ${businessSlug}`,
          businessInfo
        );

        return this._createAPIResponse(
          businessInfo,
          true,
          'Business data fetched successfully'
        );
      }

      // Real API call
      const response = await httpClient.get(BUSINESS_ENDPOINTS.BY_SLUG(businessSlug));
      return response.data;
    } catch (error) {
      console.error(`Error fetching business data:`, error);
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Update business data
  async updateBusinessData(businessSlug, updatedData) {
    try {
      if (this.mockMode) {
        console.log(
          `[MOCK API] Updating business data for: ${businessSlug}`,
          updatedData
        );
        await this._simulateDelay(400);

        const business = this._getBusinessDataBySlug(businessSlug);
        if (!business) {
          throw new Error(`Failed to update business with slug "${businessSlug}"`);
        }

        const updatedBusiness = { ...business, ...updatedData };

        console.log(
          `[MOCK API] Successfully updated data for: ${businessSlug}`,
          updatedBusiness
        );

        return this._createAPIResponse(
          updatedBusiness,
          true,
          'Business data updated successfully'
        );
      }

      // Real API call
      const response = await httpClient.put(BUSINESS_ENDPOINTS.BY_SLUG(businessSlug), updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating business data:`, error);
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Fetch business section
  async fetchBusinessSection(businessSlug, sectionName = null) {
    try {
      if (this.mockMode) {
        console.log(
          `[MOCK API] Fetching section "${sectionName}" for business: ${businessSlug}`
        );
        await this._simulateDelay(200);

        const businessData = this._getBusinessDataBySlug(businessSlug);

        if (!businessData) {
          throw new Error(`Business with slug "${businessSlug}" not found`);
        }

        const sectionData = sectionName ? businessData[sectionName] : businessData;

        if (sectionName && !sectionData) {
          throw new Error(
            `Section "${sectionName}" not found for business "${businessSlug}"`
          );
        }

        console.log(`[MOCK API] Successfully fetched section data:`, sectionData);

        return this._createAPIResponse(
          sectionData,
          true,
          `Section data fetched successfully`
        );
      }

      // Real API call
      const endpoint = sectionName 
        ? BUSINESS_ENDPOINTS.SECTION(businessSlug, sectionName)
        : BUSINESS_ENDPOINTS.SECTIONS(businessSlug);
      
      const response = await httpClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching section data:`, error);
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Update business section
  async updateBusinessSection(businessSlug, sectionName, sectionData) {
    try {
      if (this.mockMode) {
        console.log(
          `[MOCK API] Updating section "${sectionName}" for business: ${businessSlug}`,
          sectionData
        );
        await this._simulateDelay(350);

        const business = this._getBusinessDataBySlug(businessSlug);
        if (!business) {
          throw new Error(
            `Failed to update section "${sectionName}" for business "${businessSlug}"`
          );
        }

        const updatedSection = { ...business[sectionName], ...sectionData };

        console.log(
          `[MOCK API] Successfully updated section "${sectionName}":`,
          updatedSection
        );

        return this._createAPIResponse(
          updatedSection,
          true,
          `Section "${sectionName}" updated successfully`
        );
      }

      // Real API call
      const response = await httpClient.put(
        BUSINESS_ENDPOINTS.SECTION(businessSlug, sectionName), 
        sectionData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating section data:`, error);
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Fetch multiple business data (for admin dashboard)
  async fetchMultipleBusinessData(businessSlugs) {
    try {
      if (this.mockMode) {
        console.log(`[MOCK API] Fetching multiple business data:`, businessSlugs);
        await this._simulateDelay(600);

        const businessesData = businessSlugs.map(slug => {
          const data = this._getBusinessDataBySlug(slug);
          return data ? { slug, data } : { slug, data: null, error: 'Not found' };
        });

        console.log(
          `[MOCK API] Successfully fetched multiple business data:`,
          businessesData
        );

        return this._createAPIResponse(
          businessesData,
          true,
          'Multiple business data fetched successfully'
        );
      }

      // Real API call
      const response = await httpClient.post(BUSINESS_ENDPOINTS.MULTIPLE, { slugs: businessSlugs });
      return response.data;
    } catch (error) {
      console.error(`Error fetching multiple business data:`, error);
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Validate business data
  async validateBusinessData(businessData) {
    try {
      if (this.mockMode) {
        console.log(`[MOCK API] Validating business data:`, businessData);
        await this._simulateDelay(150);

        const errors = [];
        const warnings = [];

        // Basic validation rules
        if (!businessData.hero?.title) {
          errors.push('Hero title is required');
        }

        if (!businessData.about?.description) {
          errors.push('About description is required');
        }

        if (!businessData.contact?.email) {
          warnings.push('Contact email is missing');
        }

        if (!businessData.contact?.phone) {
          warnings.push('Contact phone is missing');
        }

        if (businessData.services?.length === 0) {
          warnings.push('No services defined');
        }

        const isValid = errors.length === 0;

        const validationResult = {
          isValid,
          errors,
          warnings,
          validatedAt: new Date().toISOString(),
        };

        console.log(`[MOCK API] Validation result:`, validationResult);

        return this._createAPIResponse(validationResult, true, 'Business data validated');
      }

      // Real API call
      const response = await httpClient.post(BUSINESS_ENDPOINTS.VALIDATE(''), businessData);
      return response.data;
    } catch (error) {
      console.error(`Error validating business data:`, error);
      return this._createAPIResponse(null, false, error.message);
    }
  }

  // Check API status
  async checkAPIStatus() {
    try {
      if (this.mockMode) {
        await this._simulateDelay(100);
        return this._createAPIResponse(
          { status: 'healthy', uptime: '99.9%' },
          true,
          'API is available'
        );
      }

      // Real API call
      const response = await httpClient.get(BUSINESS_ENDPOINTS.STATUS);
      return response.data;
    } catch (error) {
      return this._createAPIResponse(null, false, 'API is unavailable');
    }
  }

  // Toggle mock mode
  setMockMode(enabled) {
    this.mockMode = enabled;
  }
}

// Create and export singleton instance
const businessService = new BusinessService();

export { BusinessService };
export default businessService;
