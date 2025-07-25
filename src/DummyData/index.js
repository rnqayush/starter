// Centralized data exports - all dummy data flows through this file
export * from './automobiles';
export * from './business';
export * from './ecommerce';
export * from './hotels';
export * from './weddings';

// Legacy compatibility exports (to maintain existing imports temporarily)
export {
  automobileCategories as categories,
  automobileVehicles as vehicles,
  automobileVendors,
} from './automobiles';

export {
  ecommerceCategories,
  ecommerceProducts as products,
  ecommerceVendors,
  sellerDashboardData,
} from './ecommerce';

export { businessTemplates } from './business';

export {
  hotels,
  hotelBookings as bookings,
  ownerHotels,
  amenitiesList,
} from './hotels';

export { weddingVendors } from './weddings';
