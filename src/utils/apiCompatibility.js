// API Compatibility Layer
// This file provides backward compatibility for existing imports
// while allowing gradual migration to the new API structure

console.warn(
  '⚠️  Using compatibility layer for API imports. Please update imports to use the new API structure from src/api/services'
);

// Re-export all the API services with their legacy names
export * from '../api/services';

// Provide specific compatibility mappings
export { default as businessAPI } from '../api/services/businessService';
export { default as ecommerceAPI } from '../api/services/ecommerceService';
export { default as hotelAPI } from '../api/services/hotelService';
export { default as weddingAPI } from '../api/services/weddingService';

// Export the old networkManager as an alias to httpClient
export { default as networkManager } from '../api/client/httpClient';
