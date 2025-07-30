// Ecommerce Module Exports

// Pages
export { default as EcommerceMain } from './pages/EcommerceMain';
export { default as ProductList } from './pages/ProductList';
export { default as ProductDetail } from './pages/ProductDetail';
export { default as SellerDashboard } from './pages/SellerDashboard';

// Components
export { default as EcommerceCategoryLanding } from './components/EcommerceCategoryLanding';

// Store
import ecommerceManagementSliceReducer, * as ecommerceManagementSliceActions from './store/ecommerceManagementSlice';
export const ecommerceManagementSlice = {
  reducer: ecommerceManagementSliceReducer,
  actions: ecommerceManagementSliceActions
};
export * from './store/ecommerceManagementSlice';

// Utils
export * from './utils/ecommerceAPI';

// Data
export { default as ecommerceData } from './data/ecommerce.json';

// Default export - main ecommerce module component
export { default } from './components/EcommerceCategoryLanding';
