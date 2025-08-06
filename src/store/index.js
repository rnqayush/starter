/**
 * Redux Store Configuration
 *
 * This file configures the Redux store with all application slices.
 * All slices follow standardized patterns using shared utilities for consistency.
 *
 * Structure:
 * - Core: Authentication and user management
 * - Content: Blogs and content management
 * - Business Modules: Different business type management (hotels, weddings, etc.)
 */

import { configureStore } from '@reduxjs/toolkit';

// Core slices
import authReducer from './slices/authSlice';
import blogsReducer from './slices/blogsSlice';

// Business management slices
import automobileManagementReducer from './slices/automobileManagementSlice';
import businessManagementReducer from './slices/businessManagementSlice';
import ecommerceManagementReducer from './slices/ecommerceManagementSlice';
import hotelManagementReducer from './slices/hotelManagementSlice';
import vendorManagementReducer from './slices/vendorManagementSlice';
import weddingManagementReducer from './slices/weddingManagementSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Core application state
    auth: authReducer,
    blogs: blogsReducer,

    // Business module state
    automobileManagement: automobileManagementReducer,
    businessManagement: businessManagementReducer,
    ecommerceManagement: ecommerceManagementReducer,
    hotelManagement: hotelManagementReducer,
    vendorManagement: vendorManagementReducer,
    weddingManagement: weddingManagementReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // Configure serializable state check
      serializableCheck: {
        // Actions to ignore (useful for persistence libraries)
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],

        // Paths in actions to ignore
        ignoredActionsPaths: ['payload.timestamp', 'payload.error', 'meta.arg'],

        // Paths in state to ignore (for complex objects)
        ignoredPaths: [
          // Editing objects (often contain complex nested data)
          'automobileManagement.editing',
          'automobileManagement.original',
          'businessManagement.editing',
          'businessManagement.original',
          'ecommerceManagement.editing',
          'ecommerceManagement.original',
          'hotelManagement.editing',
          'hotelManagement.original',
          'vendorManagement.editing',
          'vendorManagement.original',
          'weddingManagement.vendorEditing',
          'weddingManagement.vendorOriginal',
          'weddingManagement.bookingEditing',

          // Large data arrays that might contain non-serializable data
          'automobileManagement.vehicles',
          'ecommerceManagement.products',
          'hotelManagement.hotels',
          'weddingManagement.vendors',
          'weddingManagement.bookings',
        ],
      },

      // Enable immutability check in development
      immutableCheck: {
        warnAfter: 128, // Warn if state mutations take longer than 128ms
      },

      // Enable thunk for async actions
      thunk: true,
    }),

  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

// Helper function to get initial state (useful for testing and debugging)
export const getInitialState = () => {
  return {
    auth: {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      success: false,
    },
    blogs: {
      blogs: [],
      categories: [],
      filteredBlogs: [],
      selectedBlog: null,
      loading: false,
      error: null,
      success: false,
    },
    // Business modules follow similar patterns
    automobileManagement: {
      vendor: null,
      categories: [],
      vehicles: [],
      loading: false,
      error: null,
    },
    // Add other initial states as needed
  };
};

// Helper selectors for common state access
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectCurrentUser = state => state.auth.user;
export const selectIsLoading = state => {
  return (
    state.auth.loading ||
    state.blogs.loading ||
    state.automobileManagement.loading ||
    state.businessManagement.loading ||
    state.ecommerceManagement.loading ||
    state.hotelManagement.loading ||
    state.vendorManagement.loading ||
    state.weddingManagement.loading
  );
};

// Export store as default
export default store;
