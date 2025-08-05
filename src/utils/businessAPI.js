// Legacy API file - now uses the new API structure
// This file is maintained for backward compatibility
// Please use src/api/services/businessService for new code

import { businessService } from '../api/services';

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
