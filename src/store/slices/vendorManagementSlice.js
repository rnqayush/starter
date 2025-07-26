import { createSlice } from '@reduxjs/toolkit';
import { weddingVendors } from '../../DummyData/weddings';

const initialState = {
  vendors: weddingVendors,
  editingVendor: null,
  originalVendor: null,
  changes: {},
  hasUnsavedChanges: false,
  activeVendorId: null,
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
};

const vendorManagementSlice = createSlice({
  name: 'vendorManagement',
  initialState,
  reducers: {
    setEditingVendor: (state, action) => {
      const vendorId = action.payload;
      let vendor = state.vendors.find(v => v.id === vendorId);

      // If vendor is not found in Redux state, we'll initialize with null
      // and let the component handle fetching from the dummy data
      if (!vendor) {
        console.warn(`Vendor with id ${vendorId} not found in Redux state`);
        state.editingVendor = null;
        state.originalVendor = null;
      } else {
        state.editingVendor = { ...vendor };
        state.originalVendor = { ...vendor };
      }

      state.activeVendorId = vendorId;
      state.changes = {};
      state.hasUnsavedChanges = false;
    },

    updateVendorField: (state, action) => {
      const { field, value } = action.payload;
      if (state.editingVendor) {
        state.editingVendor[field] = value;
        state.changes[field] = {
          old: state.originalVendor[field],
          new: value,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateVendorImage: (state, action) => {
      const { field, url } = action.payload;
      if (state.editingVendor) {
        state.editingVendor[field] = url;
        state.changes[field] = {
          old: state.originalVendor[field],
          new: url,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateVendorGallery: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.gallery = action.payload;
        state.changes.gallery = {
          old: state.originalVendor.gallery,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateServices: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.services = action.payload;
        state.changes.services = {
          old: state.originalVendor.services,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateTestimonials: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.testimonials = action.payload;
        state.changes.testimonials = {
          old: state.originalVendor.testimonials,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updatePackages: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.packages = action.payload;
        state.changes.packages = {
          old: state.originalVendor.packages,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateRecentWork: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.locationPortfolio = action.payload;
        state.changes.locationPortfolio = {
          old: state.originalVendor.locationPortfolio,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateCustomSections: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.customSections = action.payload;
        state.changes.customSections = {
          old: state.originalVendor.customSections || [],
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    saveChanges: state => {
      if (state.editingVendor && state.hasUnsavedChanges) {
        const vendorIndex = state.vendors.findIndex(
          v => v.id === state.editingVendor.id
        );
        if (vendorIndex !== -1) {
          state.vendors[vendorIndex] = { ...state.editingVendor };
        }
        state.originalVendor = { ...state.editingVendor };
        state.changes = {};
        state.hasUnsavedChanges = false;
      }
    },

    discardChanges: state => {
      if (state.originalVendor) {
        state.editingVendor = { ...state.originalVendor };
        state.changes = {};
        state.hasUnsavedChanges = false;
      }
    },

    initializeVendor: (state, action) => {
      const vendor = action.payload;
      const existingVendor = state.vendors.find(v => v.id === vendor.id);

      if (!existingVendor) {
        state.vendors.push(vendor);
      }
    },

    clearEditingVendor: state => {
      state.editingVendor = null;
      state.originalVendor = null;
      state.changes = {};
      state.hasUnsavedChanges = false;
      state.activeVendorId = null;
    },

    toggleSectionVisibility: (state, action) => {
      const { section } = action.payload;
      state.sectionVisibility[section] = !state.sectionVisibility[section];

      // Also update the editing vendor's sectionVisibility
      if (state.editingVendor) {
        if (!state.editingVendor.sectionVisibility) {
          state.editingVendor.sectionVisibility = {
            ...state.sectionVisibility,
          };
        }
        state.editingVendor.sectionVisibility[section] =
          state.sectionVisibility[section];
        state.changes.sectionVisibility = {
          old: state.originalVendor?.sectionVisibility || {},
          new: state.editingVendor.sectionVisibility,
        };
      }

      state.hasUnsavedChanges = true;
    },
  },
});

export const {
  setEditingVendor,
  initializeVendor,
  updateVendorField,
  updateVendorImage,
  updateVendorGallery,
  updateServices,
  updateTestimonials,
  updatePackages,
  updateRecentWork,
  updateCustomSections,
  saveChanges,
  discardChanges,
  clearEditingVendor,
  toggleSectionVisibility,
} = vendorManagementSlice.actions;

export default vendorManagementSlice.reducer;
