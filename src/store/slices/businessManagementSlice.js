import { createSlice } from '@reduxjs/toolkit';
import {
  createEditingState,
  createEntityReducers,
  createEditingReducers,
} from '../utils/sliceUtils';

// Initial state
const initialState = {
  // Core data
  businesses: [],
  businessTypes: [],

  // Editing state
  ...createEditingState(),

  // Business type configuration
  businessType: null,
  businessTypeConfig: null,

  // Section visibility
  sectionVisibility: {
    hero: true,
    'about-us': true,
    'services-offered': true,
    portfolio: false,
    skills: false,
    experience: false,
    team: true,
    gallery: true,
    'packages-pricing': true,
    testimonials: true,
    faq: true,
    contact: true,
    footer: true,
  },

  // Loading and error states
  loading: false,
  error: null,
  success: false,
};

const businessManagementSlice = createSlice({
  name: 'businessManagement',
  initialState,
  reducers: {
    // Standard reducers
    ...createEntityReducers(),
    ...createEditingReducers(),

    // Business data management
    setBusinesses: (state, action) => {
      state.businesses = action.payload;
    },

    initializeBusiness: (state, action) => {
      const business = action.payload;
      const existingBusiness = state.businesses.find(b => b.id === business.id);

      if (!existingBusiness) {
        state.businesses.push(business);
      }

      // Set business type if not already set
      if (business.type && !state.businessType) {
        state.businessType = business.type;
      }
    },

    // Business type management
    setBusinessType: (state, action) => {
      const { businessType, businessTypeConfig } = action.payload;
      state.businessType = businessType;
      state.businessTypeConfig = businessTypeConfig;

      // Update section visibility based on business type
      if (businessType === 'freelancer') {
        state.sectionVisibility = {
          ...state.sectionVisibility,
          portfolio: true,
          skills: true,
          experience: true,
          team: false,
          gallery: false,
        };
      } else {
        state.sectionVisibility = {
          ...state.sectionVisibility,
          portfolio: false,
          skills: false,
          experience: false,
          team: true,
          gallery: true,
        };
      }
    },

    // Editing management
    setEditingBusiness: (state, action) => {
      const businessId = action.payload;
      const business = state.businesses.find(b => b.id === businessId);

      if (business) {
        state.editing = { ...business };
        state.original = { ...business };
        state.hasChanges = false;
        state.changes = {};

        // Set business type when editing
        if (business.type) {
          state.businessType = business.type;
        }

        // Initialize section visibility from business data
        if (business.sectionVisibility) {
          state.sectionVisibility = { ...business.sectionVisibility };
        }
      } else {
        state.editing = null;
        state.original = null;
      }
    },

    // Field updates
    updateBusinessField: (state, action) => {
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

    updateNestedField: (state, action) => {
      const { section, field, value } = action.payload;
      if (state.editing) {
        if (!state.editing.sections) {
          state.editing.sections = {};
        }
        if (!state.editing.sections[section]) {
          state.editing.sections[section] = {};
        }

        state.editing.sections[section][field] = value;

        const changeKey = `sections.${section}.${field}`;
        state.changes[changeKey] = {
          old: state.original?.sections?.[section]?.[field],
          new: value,
        };
        state.hasChanges = true;
      }
    },

    // Content management
    updateBusinessContent: (state, action) => {
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

    // Section visibility management
    toggleSectionVisibility: (state, action) => {
      const { section } = action.payload;

      // Check if section is allowed for current business type
      if (state.businessTypeConfig?.hiddenSections?.includes(section)) {
        console.warn(
          `Section "${section}" is not available for business type "${state.businessType}"`
        );
        return;
      }

      state.sectionVisibility[section] = !state.sectionVisibility[section];

      // Update the editing business's sectionVisibility
      if (state.editing) {
        if (!state.editing.sectionVisibility) {
          state.editing.sectionVisibility = { ...state.sectionVisibility };
        }
        state.editing.sectionVisibility[section] =
          state.sectionVisibility[section];

        state.changes.sectionVisibility = {
          old: state.original?.sectionVisibility || {},
          new: state.editing.sectionVisibility,
        };
        state.hasChanges = true;
      }
    },

    // Save and publish
    saveBusiness: state => {
      if (state.editing && state.hasChanges) {
        const businessIndex = state.businesses.findIndex(
          b => b.id === state.editing.id
        );

        if (businessIndex !== -1) {
          state.businesses[businessIndex] = { ...state.editing };
        } else {
          // Add new business if it doesn't exist
          state.businesses.push({ ...state.editing });
        }

        state.original = { ...state.editing };
        state.changes = {};
        state.hasChanges = false;
        state.success = true;
      }
    },

    discardBusinessChanges: state => {
      if (state.original) {
        state.editing = { ...state.original };
        state.changes = {};
        state.hasChanges = false;
      }
    },

    clearEditingBusiness: state => {
      state.editing = null;
      state.original = null;
      state.changes = {};
      state.hasChanges = false;
    },

    // Section availability check
    isSectionAvailable: (state, action) => {
      const { section } = action.payload;

      if (!state.businessTypeConfig) return true;

      const isHiddenSection =
        state.businessTypeConfig.hiddenSections?.includes(section);
      return !isHiddenSection;
    },

    // Additional legacy reducers for compatibility
    markUnsavedChanges: state => {
      state.hasChanges = true;
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

  // Business actions
  setBusinesses,
  initializeBusiness,
  setBusinessType,

  // Editing actions
  setEditingBusiness,
  updateBusinessField,
  updateNestedField,
  updateBusinessContent,
  saveBusiness,
  discardBusinessChanges,
  clearEditingBusiness,

  // Section management
  toggleSectionVisibility,
  isSectionAvailable,

  // Legacy actions
  markUnsavedChanges,

  // Utility actions
  resetState,
} = businessManagementSlice.actions;

// Legacy action aliases for backward compatibility
export const saveBusinessChanges = saveBusiness;
export const toggleBusinessSectionVisibility = toggleSectionVisibility;
export const initializeBusinessData = initializeBusiness;

// Selectors
export const selectBusinesses = state => state.businessManagement.businesses;
export const selectEditingBusiness = state => state.businessManagement.editing;
export const selectBusinessType = state =>
  state.businessManagement.businessType;
export const selectBusinessTypeConfig = state =>
  state.businessManagement.businessTypeConfig;
export const selectSectionVisibility = state =>
  state.businessManagement.sectionVisibility;
export const selectHasChanges = state => state.businessManagement.hasChanges;
export const selectChanges = state => state.businessManagement.changes;
export const selectLoading = state => state.businessManagement.loading;
export const selectError = state => state.businessManagement.error;
export const selectSuccess = state => state.businessManagement.success;

// Complex selectors
export const selectBusinessById = businessId => state =>
  state.businessManagement.businesses.find(
    business => business.id === businessId
  );

export const selectBusinessesByType = businessType => state =>
  state.businessManagement.businesses.filter(
    business => business.type === businessType
  );

export const selectVisibleSections = state =>
  Object.entries(state.businessManagement.sectionVisibility)
    .filter(([_, visible]) => visible)
    .map(([section, _]) => section);

export const selectAvailableSections = state => {
  const { sectionVisibility, businessTypeConfig } = state.businessManagement;

  if (!businessTypeConfig?.hiddenSections) {
    return Object.keys(sectionVisibility);
  }

  return Object.keys(sectionVisibility).filter(
    section => !businessTypeConfig.hiddenSections.includes(section)
  );
};

export default businessManagementSlice.reducer;
