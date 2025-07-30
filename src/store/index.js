import { configureStore } from '@reduxjs/toolkit';
import { hotelManagementSlice } from '../hotel';
import { vendorManagementSlice, weddingManagementSlice } from '../weddings';
import { businessManagementSlice } from '../business';
import { automobileManagementSlice } from '../automobiles';
import { ecommerceManagementSlice } from '../ecommerce';
import { blogsSlice } from '../blog';

export const store = configureStore({
  reducer: {
    hotelManagement: hotelManagementSlice.reducer,
    vendorManagement: vendorManagementSlice.reducer,
    weddingManagement: weddingManagementSlice.reducer,
    businessManagement: businessManagementSlice.reducer,
    automobileManagement: automobileManagementSlice.reducer,
    ecommerceManagement: ecommerceManagementSlice.reducer,
    blogs: blogsSlice.reducer,
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
