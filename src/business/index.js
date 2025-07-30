// Business Module Exports

// Pages
export { default as BuisnessAdminDashboard } from './pages/BuisnessAdminDashboard';
export { default as BusinessWebsitePage } from './pages/BusinessWebsitePage';
export { default as FreelancerPortfolioPage } from './pages/FreelancerPortfolioPage';

// Components
export { default as BusinessCategoryLanding } from './components/BusinessCategoryLanding';

// Store
import businessManagementSliceReducer, * as businessManagementSliceActions from './store/businessManagementSlice';
export const businessManagementSlice = {
  reducer: businessManagementSliceReducer,
  actions: businessManagementSliceActions
};
export * from './store/businessManagementSlice';

// Utils
export * from './utils/businessAPI';

// Data
export { default as businessData } from './data/business.json';

// Default export - main business module component
export { default } from './components/BusinessCategoryLanding';
