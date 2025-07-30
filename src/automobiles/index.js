// Automobiles Module Exports

// Pages
export { default as AutomobileMain } from './pages/AutomobileMain';
export { default as DealerDashboard } from './pages/DealerDashboard';
export { default as VehicleDetail } from './pages/VehicleDetail';
export { default as Vehicles } from './pages/Vehicles';
export { default as Wishlist } from './pages/Wishlist';

// Components
export { default as AutomobileCategoryLanding } from './components/AutomobileCategoryLanding';

// Store
import automobileManagementSliceReducer, * as automobileManagementSliceActions from './store/automobileManagementSlice';
export const automobileManagementSlice = {
  reducer: automobileManagementSliceReducer,
  actions: automobileManagementSliceActions
};
export * from './store/automobileManagementSlice';

// Data
export { default as automobilesData } from './data/automobiles.json';

// Default export - main automobile module component
export { default } from './components/AutomobileCategoryLanding';
