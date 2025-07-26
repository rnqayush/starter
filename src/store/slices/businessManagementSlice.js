import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  businesses: [],
  editingBusiness: null,
  originalBusiness: null,
  changes: {},
  hasUnsavedChanges: false,
  activeBusinessId: null,
  sectionVisibility: {
    hero: true,
    about: true,
    services: true,
    portfolio: true,
    skills: true,
    experience: true,
    team: true,
    gallery: true,
    contact: true,
    packages: true,
    testimonials: true,
  },
};

const businessManagementSlice = createSlice({
  name: 'businessManagement',
  initialState,
  reducers: {
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
  },
});

export const {
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
} = businessManagementSlice.actions;

export default businessManagementSlice.reducer;
