// Legacy E-commerce API file - now uses the new API structure
// This file is maintained for backward compatibility
// Please use src/api/services/ecommerceService for new code

import { ecommerceService, ecommerceUtils } from '../api/services';

// Re-export the service as ecommerceAPI for backward compatibility
export const ecommerceAPI = ecommerceService;

// Export utils
export { ecommerceUtils };

// Default export
const ecommerceAPIBundle = {
  ecommerceAPI,
  ecommerceUtils,
};

export default ecommerceAPIBundle;
