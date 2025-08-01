import { configureStore } from '@reduxjs/toolkit';
import hotelManagementReducer from './slices/hotelManagementSlice';
import vendorManagementReducer from './slices/vendorManagementSlice';
import weddingManagementReducer from './slices/weddingManagementSlice';
import businessManagementReducer from './slices/businessManagementSlice';
import automobileManagementReducer from './slices/automobileManagementSlice';
import ecommerceManagementReducer from './slices/ecommerceManagementSlice';
import blogsReducer from './slices/blogsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    hotelManagement: hotelManagementReducer,
    vendorManagement: vendorManagementReducer,
    weddingManagement: weddingManagementReducer,
    businessManagement: businessManagementReducer,
    automobileManagement: automobileManagementReducer,
    ecommerceManagement: ecommerceManagementReducer,
    blogs: blogsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredActionsPaths: ['payload'],
        ignoredPaths: [
          'vendorManagement.editingVendor',
          'vendorManagement.originalVendor',
          'weddingManagement.editingVendor',
          'weddingManagement.originalVendor',
          'weddingManagement.editingBooking',
          'businessManagement.editingBusiness',
          'businessManagement.originalBusiness',
          'automobileManagement.selectedVehicle',
          'automobileManagement.vehicles',
          'ecommerceManagement.vendor',
          'ecommerceManagement.products',
          'ecommerceManagement.categories',
        ],
      },
    }),
});

export default store;
