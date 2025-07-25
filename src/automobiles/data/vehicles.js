// Temporary redirect to centralized data - this file will be removed later
export * from '../../DummyData';

// Legacy exports for backward compatibility
export {
  automobileCategories as categories,
  automobileVehicles as vehicles,
  getFeaturedVehicles,
  getOnSaleVehicles,
  getVehiclesByCategory,
  getVehicleById,
  getVehiclesByAvailability,
  getVehiclesByCondition,
  getVehiclesByMake,
  getVehiclesByPriceRange,
  getVehicleAvailabilityStatus as getAvailabilityStatus,
  getVehicleAvailabilityLabel as getAvailabilityLabel,
  getVehicleAvailabilityColor as getAvailabilityColor,
} from '../../DummyData';
