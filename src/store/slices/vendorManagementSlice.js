import { createSlice } from '@reduxjs/toolkit';
import { getStaticWeddingVendors } from '../../utils/weddingAPI';
import {
  createEntityState,
  createEditingState,
  createEntityReducers,
  createEditingReducers,
} from '../utils/sliceUtils';

// Initial state
const initialState = {
  // Core data
  vendors: getStaticWeddingVendors(),
  
  // Editing state
  ...createEditingState(),
  
  // Section visibility
  sectionVisibility: {
    hero: true,
    about: true,
    services: true,
    recentWork: true,
    photosMedia: true,
    testimonials: true,
    packages: true,
    customSections: true,
  },
  
  // Loading and error states
  loading: false,
  error: null,
  success: false,
};

const vendorManagementSlice = createSlice({
  name: 'vendorManagement',
  initialState,
  reducers: {
    // Standard reducers
    ...createEntityReducers(),
    ...createEditingReducers(),

    // Vendor data management
    setVendors: (state, action) => {
      state.vendors = action.payload;
    },

    initializeVendor: (state, action) => {
      const vendor = action.payload;
      const existingVendor = state.vendors.find(v => v.id === vendor.id);

      if (!existingVendor) {
        state.vendors.push(vendor);
      }
    },

    // Editing management
    setEditingVendor: (state, action) => {
      const vendorId = action.payload;
      const vendor = state.vendors.find(v => v.id === vendorId);

      if (vendor) {
        state.editing = { ...vendor };
        state.original = { ...vendor };
        state.hasChanges = false;
        state.changes = {};
      } else {
        console.warn(`Vendor with id ${vendorId} not found in Redux state`);
        state.editing = null;
        state.original = null;
      }
    },

    // Field updates
    updateVendorField: (state, action) => {
      const { field, value } = action.payload;
      if (state.editing) {
        state.editing[field] = value;
        state.changes[field] = {
          old: state.original?.[field],
          new: value,
        };
        state.hasChanges = true;
      }
    },

    updateVendorImage: (state, action) => {
      const { field, url } = action.payload;
      if (state.editing) {
        state.editing[field] = url;
        state.changes[field] = {
          old: state.original?.[field],
          new: url,
        };
        state.hasChanges = true;
      }
    },

    // Content management
    updateVendorContent: (state, action) => {
      const { contentType, data } = action.payload;
      if (state.editing) {
        state.editing[contentType] = data;
        state.changes[contentType] = {
          old: state.original?.[contentType],
          new: data,
        };
        state.hasChanges = true;
      }
    },

    // Specific content updates
    updateGallery: (state, action) => {
      if (state.editing) {
        state.editing.gallery = action.payload;
        state.changes.gallery = {
          old: state.original?.gallery,
          new: action.payload,
        };
        state.hasChanges = true;
      }
    },

    updateServices: (state, action) => {
      if (state.editing) {
        state.editing.services = action.payload;
        state.changes.services = {
          old: state.original?.services,
          new: action.payload,
        };
        state.hasChanges = true;
      }
    },

    updateTestimonials: (state, action) => {
      if (state.editing) {
        state.editing.testimonials = action.payload;
        state.changes.testimonials = {
          old: state.original?.testimonials,
          new: action.payload,
        };
        state.hasChanges = true;
      }
    },

    updatePackages: (state, action) => {
      if (state.editing) {
        state.editing.packages = action.payload;
        state.changes.packages = {
          old: state.original?.packages,
          new: action.payload,
        };
        state.hasChanges = true;
      }
    },

    updateRecentWork: (state, action) => {
      if (state.editing) {
        state.editing.locationPortfolio = action.payload;
        state.changes.locationPortfolio = {
          old: state.original?.locationPortfolio,
          new: action.payload,
        };
        state.hasChanges = true;
      }
    },

    updateCustomSections: (state, action) => {
      if (state.editing) {
        state.editing.customSections = action.payload;
        state.changes.customSections = {
          old: state.original?.customSections || [],
          new: action.payload,
        };
        state.hasChanges = true;
      }
    },

    // Section visibility management
    toggleSectionVisibility: (state, action) => {
      const { section } = action.payload;
      state.sectionVisibility[section] = !state.sectionVisibility[section];

      // Update the editing vendor's sectionVisibility
      if (state.editing) {
        if (!state.editing.sectionVisibility) {
          state.editing.sectionVisibility = { ...state.sectionVisibility };
        }
        state.editing.sectionVisibility[section] = state.sectionVisibility[section];
        
        state.changes.sectionVisibility = {
          old: state.original?.sectionVisibility || {},
          new: state.editing.sectionVisibility,
        };
        state.hasChanges = true;
      }
    },

    // Save and publish
    saveVendor: (state) => {
      if (state.editing && state.hasChanges) {
        const vendorIndex = state.vendors.findIndex(v => v.id === state.editing.id);
        
        if (vendorIndex !== -1) {
          state.vendors[vendorIndex] = { ...state.editing };
        }
        
        state.original = { ...state.editing };
        state.changes = {};
        state.hasChanges = false;
        state.success = true;
      }
    },

    discardVendorChanges: (state) => {
      if (state.original) {
        state.editing = { ...state.original };
        state.changes = {};
        state.hasChanges = false;
      }
    },

    clearEditingVendor: (state) => {
      state.editing = null;
      state.original = null;
      state.changes = {};
      state.hasChanges = false;
    },

    // Reset state
    resetState: () => initialState,
  },
});

// Export actions
export const {
  // Standard actions
  setLoading,
  setError,
  clearError,
  setSuccess,
  
  // Vendor actions
  setVendors,
  initializeVendor,
  
  // Editing actions
  setEditingVendor,
  updateVendorField,
  updateVendorImage,
  updateVendorContent,
  updateGallery,
  updateServices,
  updateTestimonials,
  updatePackages,
  updateRecentWork,
  updateCustomSections,
  saveVendor,
  discardVendorChanges,
  clearEditingVendor,
  
  // Section management
  toggleSectionVisibility,
  
  // Utility actions
  resetState,
} = vendorManagementSlice.actions;

// Selectors
export const selectVendors = (state) => state.vendorManagement.vendors;
export const selectEditingVendor = (state) => state.vendorManagement.editing;
export const selectSectionVisibility = (state) => state.vendorManagement.sectionVisibility;
export const selectHasChanges = (state) => state.vendorManagement.hasChanges;
export const selectChanges = (state) => state.vendorManagement.changes;
export const selectLoading = (state) => state.vendorManagement.loading;
export const selectError = (state) => state.vendorManagement.error;
export const selectSuccess = (state) => state.vendorManagement.success;

// Complex selectors
export const selectVendorById = (vendorId) => (state) =>
  state.vendorManagement.vendors.find(vendor => vendor.id === vendorId);

export const selectVendorsByCategory = (category) => (state) =>
  state.vendorManagement.vendors.filter(vendor => vendor.category === category);

export const selectFeaturedVendors = (state) =>
  state.vendorManagement.vendors.filter(vendor => vendor.featured);

export const selectVisibleSections = (state) =>
  Object.entries(state.vendorManagement.sectionVisibility)
    .filter(([_, visible]) => visible)
    .map(([section, _]) => section);

export default vendorManagementSlice.reducer;
