import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  businesses: [],
  editingBusiness: null,
  originalBusiness: null,
  changes: {},
  hasUnsavedChanges: false,
  activeBusinessId: null,
  businessType: null, // 'business' or 'freelancer'
  businessTypeConfig: null,
  sectionVisibility: {
    hero: true,
    'about-us': true,
    'services-offered': true,
    portfolio: false, // Default false, enabled for freelancer
    skills: false, // Default false, enabled for freelancer
    experience: false, // Default false, enabled for freelancer
    team: true, // Default true, disabled for freelancer
    gallery: true, // Default true, disabled for freelancer
    'packages-pricing': true,
    testimonials: true,
    faq: true,
    contact: true,
    footer: true,
  },
  loading: false,
  error: null,
};

const businessManagementSlice = createSlice({
  name: 'businessManagement',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Clear error state
    clearError: state => {
      state.error = null;
    },

    // Initialize business data from JSON
    initializeBusinessData: (state, action) => {
      const { businessData, businessTypeConfig } = action.payload;
      state.businesses = [businessData];
      state.businessType = businessData.type;
      state.businessTypeConfig = businessTypeConfig;

      // Set section visibility based on business type
      if (businessData.type === 'freelancer') {
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

      // Apply business's custom section visibility if available
      if (businessData.sectionVisibility) {
        state.sectionVisibility = {
          ...state.sectionVisibility,
          ...businessData.sectionVisibility,
        };
      }
    },

    // Detect and set business type
    setBusinessType: (state, action) => {
      const { businessType, businessTypeConfig } = action.payload;
      state.businessType = businessType;
      state.businessTypeConfig = businessTypeConfig;

      // Update section visibility based on business type
      if (businessType === 'freelancer') {
        // Enable freelancer-specific sections
        state.sectionVisibility.portfolio = true;
        state.sectionVisibility.skills = true;
        state.sectionVisibility.experience = true;
        // Disable business-specific sections
        state.sectionVisibility.team = false;
        state.sectionVisibility.gallery = false;
      } else {
        // Enable business-specific sections
        state.sectionVisibility.team = true;
        state.sectionVisibility.gallery = true;
        // Disable freelancer-specific sections
        state.sectionVisibility.portfolio = false;
        state.sectionVisibility.skills = false;
        state.sectionVisibility.experience = false;
      }
    },

    setEditingBusiness: (state, action) => {
      const businessId = action.payload;
      let business = state.businesses.find(b => b.id === businessId);

      // If business is not found in Redux state, we'll initialize with null
      // and let the component handle fetching from the dummy data
      if (!business) {
        console.warn(`Business with id ${businessId} not found in Redux state`);
        state.editingBusiness = null;
        state.originalBusiness = null;
      } else {
        state.editingBusiness = { ...business };
        state.originalBusiness = { ...business };

        // Set business type when editing
        if (business.type) {
          state.businessType = business.type;
        }
      }

      state.activeBusinessId = businessId;
      state.changes = {};
      state.hasUnsavedChanges = false;
    },

    updateBusinessField: (state, action) => {
      const { field, value } = action.payload;
      if (state.editingBusiness) {
        state.editingBusiness[field] = value;
        state.changes[field] = {
          old: state.originalBusiness[field],
          new: value,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessImage: (state, action) => {
      const { field, url } = action.payload;
      if (state.editingBusiness) {
        state.editingBusiness[field] = url;
        state.changes[field] = {
          old: state.originalBusiness[field],
          new: url,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessGallery: (state, action) => {
      if (state.editingBusiness) {
        state.editingBusiness.gallery = action.payload;
        state.changes.gallery = {
          old: state.originalBusiness.gallery,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessServices: (state, action) => {
      if (state.editingBusiness) {
        state.editingBusiness.services = action.payload;
        state.changes.services = {
          old: state.originalBusiness.services,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessTestimonials: (state, action) => {
      if (state.editingBusiness) {
        state.editingBusiness.testimonials = action.payload;
        state.changes.testimonials = {
          old: state.originalBusiness.testimonials,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessPackages: (state, action) => {
      if (state.editingBusiness) {
        state.editingBusiness.packages = action.payload;
        state.changes.packages = {
          old: state.originalBusiness.packages,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessPortfolio: (state, action) => {
      if (state.editingBusiness) {
        state.editingBusiness.portfolio = action.payload;
        state.changes.portfolio = {
          old: state.originalBusiness.portfolio,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessSkills: (state, action) => {
      if (state.editingBusiness) {
        state.editingBusiness.skills = action.payload;
        state.changes.skills = {
          old: state.originalBusiness.skills,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessExperience: (state, action) => {
      if (state.editingBusiness) {
        state.editingBusiness.experience = action.payload;
        state.changes.experience = {
          old: state.originalBusiness.experience,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessTeam: (state, action) => {
      if (state.editingBusiness) {
        state.editingBusiness.team = action.payload;
        state.changes.team = {
          old: state.originalBusiness.team,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateBusinessCustomSections: (state, action) => {
      if (state.editingBusiness) {
        state.editingBusiness.customSections = action.payload;
        state.changes.customSections = {
          old: state.originalBusiness.customSections || [],
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    saveBusinessChanges: state => {
      if (state.editingBusiness && state.hasUnsavedChanges) {
        const businessIndex = state.businesses.findIndex(
          b => b.id === state.editingBusiness.id
        );
        if (businessIndex !== -1) {
          state.businesses[businessIndex] = { ...state.editingBusiness };
        } else {
          // Add new business if it doesn't exist
          state.businesses.push({ ...state.editingBusiness });
        }
        state.originalBusiness = { ...state.editingBusiness };
        state.changes = {};
        state.hasUnsavedChanges = false;
      }
    },

    discardBusinessChanges: state => {
      if (state.originalBusiness) {
        state.editingBusiness = { ...state.originalBusiness };
        state.changes = {};
        state.hasUnsavedChanges = false;
      }
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

    clearEditingBusiness: state => {
      state.editingBusiness = null;
      state.originalBusiness = null;
      state.changes = {};
      state.hasUnsavedChanges = false;
      state.activeBusinessId = null;
    },

    toggleBusinessSectionVisibility: (state, action) => {
      const { section } = action.payload;

      // Check if section is allowed for current business type
      if (state.businessTypeConfig) {
        const isHiddenSection =
          state.businessTypeConfig.hiddenSections?.includes(section);
        if (isHiddenSection) {
          console.warn(
            `Section "${section}" is not available for business type "${state.businessType}"`
          );
          return;
        }
      }

      state.sectionVisibility[section] = !state.sectionVisibility[section];

      // Also update the editing business's sectionVisibility
      if (state.editingBusiness) {
        if (!state.editingBusiness.sectionVisibility) {
          state.editingBusiness.sectionVisibility = {
            ...state.sectionVisibility,
          };
        }
        state.editingBusiness.sectionVisibility[section] =
          state.sectionVisibility[section];
        state.changes.sectionVisibility = {
          old: state.originalBusiness?.sectionVisibility || {},
          new: state.editingBusiness.sectionVisibility,
        };
      }

      state.hasUnsavedChanges = true;
    },

    // Mark that there are unsaved changes
    markUnsavedChanges: (state) => {
      state.hasUnsavedChanges = true;
    },

    // Helper to check if section should be visible for current business type
    isSectionAvailable: (state, action) => {
      const { section } = action.payload;

      if (!state.businessTypeConfig) return true;

      const isHiddenSection =
        state.businessTypeConfig.hiddenSections?.includes(section);
      return !isHiddenSection;
    },

    // Update entire section visibility based on business type
    updateSectionVisibilityByType: (state, action) => {
      const { businessType, businessTypeConfig } = action.payload;

      state.businessType = businessType;
      state.businessTypeConfig = businessTypeConfig;

      if (businessTypeConfig?.features) {
        const features = businessTypeConfig.features;
        state.sectionVisibility = {
          ...state.sectionVisibility,
          portfolio: features.showPortfolio || false,
          skills: features.showSkills || false,
          experience: features.showExperience || false,
          team: features.showTeam !== false, // Default true unless explicitly false
          gallery: features.showGallery !== false, // Default true unless explicitly false
          'packages-pricing': features.showPackages !== false, // Default true unless explicitly false
        };
      }
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  initializeBusinessData,
  setBusinessType,
  setEditingBusiness,
  initializeBusiness,
  updateBusinessField,
  updateBusinessImage,
  updateBusinessGallery,
  updateBusinessServices,
  updateBusinessTestimonials,
  updateBusinessPackages,
  updateBusinessPortfolio,
  updateBusinessSkills,
  updateBusinessExperience,
  updateBusinessTeam,
  updateBusinessCustomSections,
  saveBusinessChanges,
  discardBusinessChanges,
  clearEditingBusiness,
  toggleBusinessSectionVisibility,
  markUnsavedChanges,
  isSectionAvailable,
  updateSectionVisibilityByType,
} = businessManagementSlice.actions;

export default businessManagementSlice.reducer;
