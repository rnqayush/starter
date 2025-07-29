// Fake API service to simulate API calls for business data
// This mimics what would be real API calls to a backend service

import {
  getBusinessWebsiteData,
  updateBusinessWebsiteData,
} from '../DummyData';
import businessData from '../DummyData/business.json';

// Simulate network delay for realistic API behavior
const simulateDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Simulate API response structure
const createAPIResponse = (data, success = true, message = '') => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Fake API to fetch business website data
 * @param {string} businessSlug - The business slug/identifier
 * @returns {Promise} - Promise that resolves to business data
 */
export const fetchBusinessData = async businessSlug => {
  try {
    console.log(`[FAKE API] Fetching business data for: ${businessSlug}`);

    // Simulate network delay
    await simulateDelay(300);

    const businessData = getBusinessWebsiteData(businessSlug);

    if (!businessData) {
      throw new Error(`Business with slug "${businessSlug}" not found`);
    }

    console.log(
      `[FAKE API] Successfully fetched data for: ${businessSlug}`,
      businessData
    );

    return createAPIResponse(
      businessData,
      true,
      'Business data fetched successfully'
    );
  } catch (error) {
    console.error(`[FAKE API] Error fetching business data:`, error);
    return createAPIResponse(null, false, error.message);
  }
};

/**
 * Fake API to update business website data
 * @param {string} businessSlug - The business slug/identifier
 * @param {object} updatedData - The updated business data
 * @returns {Promise} - Promise that resolves to updated business data
 */
export const updateBusinessData = async (businessSlug, updatedData) => {
  try {
    console.log(
      `[FAKE API] Updating business data for: ${businessSlug}`,
      updatedData
    );

    // Simulate network delay
    await simulateDelay(400);

    const updatedBusiness = updateBusinessWebsiteData(
      businessSlug,
      updatedData
    );

    if (!updatedBusiness) {
      throw new Error(`Failed to update business with slug "${businessSlug}"`);
    }

    console.log(
      `[FAKE API] Successfully updated data for: ${businessSlug}`,
      updatedBusiness
    );

    return createAPIResponse(
      updatedBusiness,
      true,
      'Business data updated successfully'
    );
  } catch (error) {
    console.error(`[FAKE API] Error updating business data:`, error);
    return createAPIResponse(null, false, error.message);
  }
};

/**
 * Fake API to fetch business sections data
 * @param {string} businessSlug - The business slug/identifier
 * @param {string} sectionName - The specific section to fetch (optional)
 * @returns {Promise} - Promise that resolves to section data
 */
export const fetchBusinessSection = async (
  businessSlug,
  sectionName = null
) => {
  try {
    console.log(
      `[FAKE API] Fetching section "${sectionName}" for business: ${businessSlug}`
    );

    // Simulate network delay
    await simulateDelay(200);

    const businessData = getBusinessWebsiteData(businessSlug);

    if (!businessData) {
      throw new Error(`Business with slug "${businessSlug}" not found`);
    }

    const sectionData = sectionName ? businessData[sectionName] : businessData;

    if (sectionName && !sectionData) {
      throw new Error(
        `Section "${sectionName}" not found for business "${businessSlug}"`
      );
    }

    console.log(`[FAKE API] Successfully fetched section data:`, sectionData);

    return createAPIResponse(
      sectionData,
      true,
      `Section data fetched successfully`
    );
  } catch (error) {
    console.error(`[FAKE API] Error fetching section data:`, error);
    return createAPIResponse(null, false, error.message);
  }
};

/**
 * Fake API to update a specific business section
 * @param {string} businessSlug - The business slug/identifier
 * @param {string} sectionName - The section to update
 * @param {object} sectionData - The updated section data
 * @returns {Promise} - Promise that resolves to updated section data
 */
export const updateBusinessSection = async (
  businessSlug,
  sectionName,
  sectionData
) => {
  try {
    console.log(
      `[FAKE API] Updating section "${sectionName}" for business: ${businessSlug}`,
      sectionData
    );

    // Simulate network delay
    await simulateDelay(350);

    const updatedBusiness = updateBusinessWebsiteData(businessSlug, {
      [sectionName]: sectionData,
    });

    if (!updatedBusiness) {
      throw new Error(
        `Failed to update section "${sectionName}" for business "${businessSlug}"`
      );
    }

    console.log(
      `[FAKE API] Successfully updated section "${sectionName}":`,
      updatedBusiness[sectionName]
    );

    return createAPIResponse(
      updatedBusiness[sectionName],
      true,
      `Section "${sectionName}" updated successfully`
    );
  } catch (error) {
    console.error(`[FAKE API] Error updating section data:`, error);
    return createAPIResponse(null, false, error.message);
  }
};

/**
 * Fake API to fetch multiple business data (for admin dashboard)
 * @param {array} businessSlugs - Array of business slugs to fetch
 * @returns {Promise} - Promise that resolves to array of business data
 */
export const fetchMultipleBusinessData = async businessSlugs => {
  try {
    console.log(`[FAKE API] Fetching multiple business data:`, businessSlugs);

    // Simulate network delay
    await simulateDelay(600);

    const businessesData = businessSlugs.map(slug => {
      const data = getBusinessWebsiteData(slug);
      return data ? { slug, data } : { slug, data: null, error: 'Not found' };
    });

    console.log(
      `[FAKE API] Successfully fetched multiple business data:`,
      businessesData
    );

    return createAPIResponse(
      businessesData,
      true,
      'Multiple business data fetched successfully'
    );
  } catch (error) {
    console.error(`[FAKE API] Error fetching multiple business data:`, error);
    return createAPIResponse(null, false, error.message);
  }
};

/**
 * Fake API to validate business data before saving
 * @param {object} businessData - The business data to validate
 * @returns {Promise} - Promise that resolves to validation results
 */
export const validateBusinessData = async businessData => {
  try {
    console.log(`[FAKE API] Validating business data:`, businessData);

    // Simulate network delay
    await simulateDelay(150);

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

    console.log(`[FAKE API] Validation result:`, validationResult);

    return createAPIResponse(validationResult, true, 'Business data validated');
  } catch (error) {
    console.error(`[FAKE API] Error validating business data:`, error);
    return createAPIResponse(null, false, error.message);
  }
};

/**
 * Utility function to check if API is available (for loading states)
 * @returns {Promise} - Promise that resolves to API status
 */
export const checkAPIStatus = async () => {
  try {
    // Simulate API health check
    await simulateDelay(100);

    return createAPIResponse(
      { status: 'healthy', uptime: '99.9%' },
      true,
      'API is available'
    );
  } catch (error) {
    return createAPIResponse(null, false, 'API is unavailable');
  }
};

// Export an object with all API methods for easier importing
export const BusinessAPI = {
  fetchBusinessData,
  updateBusinessData,
  fetchBusinessSection,
  updateBusinessSection,
  fetchMultipleBusinessData,
  validateBusinessData,
  checkAPIStatus,
};

// Default export
export default BusinessAPI;
