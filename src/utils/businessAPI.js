// Legacy API file - now uses the new API structure
// This file is maintained for backward compatibility
// Please use src/api/services/businessService for new code

import { businessService } from '../api/services';

// Re-export all functions from the new business service
export const getBusinessTypeConfig = businessService.getBusinessTypeConfig.bind(businessService);
export const detectBusinessType = businessService.detectBusinessType.bind(businessService);
export const fetchBusinessData = businessService.fetchBusinessData.bind(businessService);
export const updateBusinessData = businessService.updateBusinessData.bind(businessService);
export const fetchBusinessSection = businessService.fetchBusinessSection.bind(businessService);
export const updateBusinessSection = businessService.updateBusinessSection.bind(businessService);
export const fetchMultipleBusinessData = businessService.fetchMultipleBusinessData.bind(businessService);
export const validateBusinessData = businessService.validateBusinessData.bind(businessService);
export const checkAPIStatus = businessService.checkAPIStatus.bind(businessService);

// Export an object with all API methods for easier importing
export const BusinessAPI = {
  fetchBusinessData,
  updateBusinessData,
  fetchBusinessSection,
  updateBusinessSection,
  fetchMultipleBusinessData,
  validateBusinessData,
  checkAPIStatus,
  detectBusinessType,
  getBusinessTypeConfig,
};

// Default export
export default BusinessAPI;
