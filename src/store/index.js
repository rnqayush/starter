import { configureStore } from '@reduxjs/toolkit';
import hotelManagementReducer from './slices/hotelManagementSlice';
import vendorManagementReducer from './slices/vendorManagementSlice';
import businessManagementReducer from './slices/businessManagementSlice';

export const store = configureStore({
  reducer: {
    hotelManagement: hotelManagementReducer,
    vendorManagement: vendorManagementReducer,
    businessManagement: businessManagementReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredActionsPaths: ['payload'],
        ignoredPaths: [
          'vendorManagement.editingVendor',
          'vendorManagement.originalVendor',
          'businessManagement.editingBusiness',
          'businessManagement.originalBusiness',
        ],
      },
    }),
});

export default store;
