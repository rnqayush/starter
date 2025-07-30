// Weddings Module Exports

// Pages
export { default as VendorDashboard } from './pages/VendorDashboard';
export { default as VendorPage } from './pages/VendorPage';
export { default as VendorPortfolio } from './pages/VendorPortfolio';
export { default as WeddingHome } from './pages/WeddingHome';

// Components
export { default as WeddingCategoryLanding } from './components/WeddingCategoryLanding';

// Store
import weddingManagementSliceReducer, * as weddingManagementSliceActions from './store/weddingManagementSlice';
import vendorManagementSliceReducer, * as vendorManagementSliceActions from './store/vendorManagementSlice';

export const weddingManagementSlice = {
  reducer: weddingManagementSliceReducer,
  actions: weddingManagementSliceActions
};

export const vendorManagementSlice = {
  reducer: vendorManagementSliceReducer,
  actions: vendorManagementSliceActions
};

// Note: Only exporting vendorManagementSlice to avoid conflicts
// weddingManagementSlice is available via the named export above
export * from './store/vendorManagementSlice';

// Utils
export * from './utils/weddingAPI';

// Data
export { default as weddingData } from './data/wedding.json';

// Default export - main wedding module component
export { default } from './components/WeddingCategoryLanding';
