import { createSlice } from '@reduxjs/toolkit';
import {
  getStaticWeddingVendors,
  getStaticWeddingBookings,
  getVendorById,
} from '../../utils/weddingAPI';
import {
  createFilterState,
  createEntityReducers,
  createFilterReducers,
} from '../utils/sliceUtils';

// Initial state
const initialState = {
  // Vendor management
  vendors: getStaticWeddingVendors(),
  selectedVendor: null,

  // Booking management
  bookings: getStaticWeddingBookings(),
  selectedBooking: null,

  // Vendor editing state
  vendorEditing: null,
  vendorOriginal: null,
  vendorChanges: {},
  hasVendorChanges: false,

  // Booking editing state
  bookingEditing: null,
  bookingChanges: {},
  hasBookingChanges: false,

  // Section visibility
  sectionVisibility: {
    hero: true,
    'about-us': true,
    'services-offered': true,
    'recent-work': true,
    gallery: true,
    testimonials: true,
    'packages-pricing': true,
    footer: true,
    customSections: true,
  },
  customSectionVisibility: {},

  // Filters
  filters: createFilterState({
    city: '',
    state: '',
    featured: false,
    category: '',
  }),

  // Settings
  realTimeUpdates: true,

  // Loading and error states
  loading: false,
  error: null,
  success: false,
};

const weddingManagementSlice = createSlice({
  name: 'weddingManagement',
  initialState,
  reducers: {
    // Standard reducers
    ...createEntityReducers(),
    ...createFilterReducers(),

    // Vendor management
    setVendors: (state, action) => {
      state.vendors = action.payload;
    },

    selectVendor: (state, action) => {
      const id = action.payload;
      state.selectedVendor = state.vendors.find(v => v.id === id) || null;
    },

    initializeVendor: (state, action) => {
      const vendor = action.payload;
      const existingVendor = state.vendors.find(v => v.id === vendor.id);

      if (!existingVendor) {
        state.vendors.push(vendor);
      }
    },

    loadVendorFromJson: (state, action) => {
      const vendorId = action.payload;
      const existingVendor = state.vendors.find(v => v.id === vendorId);

      if (!existingVendor) {
        try {
          const vendorData = getVendorById(vendorId);
          if (vendorData) {
            state.vendors.push(vendorData);
          }
        } catch (error) {
          console.error('Error loading vendor from JSON:', error);
        }
      }
    },

    refreshVendors: state => {
      state.vendors = getStaticWeddingVendors();
    },

    // Vendor editing
    setEditingVendor: (state, action) => {
      const vendorId = action.payload;
      const vendor = state.vendors.find(v => v.id === vendorId);

      if (vendor) {
        state.vendorEditing = { ...vendor };
        state.vendorOriginal = { ...vendor };
        state.vendorChanges = {};
        state.hasVendorChanges = false;
      } else {
        console.warn(`Vendor with id ${vendorId} not found in Redux state`);
        state.vendorEditing = null;
        state.vendorOriginal = null;
      }
    },

    updateVendorField: (state, action) => {
      const { field, value } = action.payload;

      if (state.vendorEditing) {
        state.vendorEditing[field] = value;
        state.vendorChanges[field] = {
          old: state.vendorOriginal?.[field],
          new: value,
        };
        state.hasVendorChanges = true;

        // Real-time update if enabled
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(
            v => v.id === state.vendorEditing.id
          );
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex] = { ...state.vendorEditing };
          }
        }
      }
    },

    updateVendorImage: (state, action) => {
      const { field, url } = action.payload;

      if (state.vendorEditing) {
        state.vendorEditing[field] = url;
        state.vendorChanges[field] = {
          old: state.vendorOriginal?.[field],
          new: url,
        };
        state.hasVendorChanges = true;

        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(
            v => v.id === state.vendorEditing.id
          );
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex][field] = url;
          }
        }
      }
    },

    // Content management
    updateVendorContent: (state, action) => {
      const { contentType, data } = action.payload;

      if (state.vendorEditing) {
        state.vendorEditing[contentType] = data;
        state.vendorChanges[contentType] = {
          old: state.vendorOriginal?.[contentType],
          new: data,
        };
        state.hasVendorChanges = true;

        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(
            v => v.id === state.vendorEditing.id
          );
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex][contentType] = data;
          }
        }
      }
    },

    updateFooterData: (state, action) => {
      const { footerData } = action.payload;

      if (state.vendorEditing) {
        // Update footer-related fields
        state.vendorEditing.footerColumns = footerData.columns;
        state.vendorEditing.footerCopyright = footerData.copyrightText;
        state.vendorEditing.footerBackgroundColor = footerData.backgroundColor;
        state.vendorEditing.footerTextColor = footerData.textColor;
        state.vendorEditing.footerDescription = footerData.description;
        state.vendorEditing.socialLinks = footerData.socialLinks;

        // Track changes
        state.vendorChanges.footerColumns = {
          old: state.vendorOriginal?.footerColumns || [],
          new: footerData.columns,
        };
        state.vendorChanges.socialLinks = {
          old: state.vendorOriginal?.socialLinks || {},
          new: footerData.socialLinks,
        };

        state.hasVendorChanges = true;

        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(
            v => v.id === state.vendorEditing.id
          );
          if (vendorIndex !== -1) {
            Object.assign(state.vendors[vendorIndex], {
              footerColumns: footerData.columns,
              footerCopyright: footerData.copyrightText,
              footerBackgroundColor: footerData.backgroundColor,
              footerTextColor: footerData.textColor,
              footerDescription: footerData.description,
              socialLinks: footerData.socialLinks,
            });
          }
        }
      }
    },

    // Save vendor changes
    saveVendorChanges: state => {
      if (state.vendorEditing && state.hasVendorChanges) {
        const vendorIndex = state.vendors.findIndex(
          v => v.id === state.vendorEditing.id
        );

        if (vendorIndex !== -1) {
          state.vendors[vendorIndex] = { ...state.vendorEditing };
        }

        state.vendorOriginal = { ...state.vendorEditing };
        state.vendorChanges = {};
        state.hasVendorChanges = false;
        state.success = true;
      }
    },

    discardVendorChanges: state => {
      if (state.vendorOriginal) {
        state.vendorEditing = { ...state.vendorOriginal };
        state.vendorChanges = {};
        state.hasVendorChanges = false;

        // Revert real-time changes
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(
            v => v.id === state.vendorOriginal.id
          );
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex] = { ...state.vendorOriginal };
          }
        }
      }
    },

    clearEditingVendor: state => {
      state.vendorEditing = null;
      state.vendorOriginal = null;
      state.vendorChanges = {};
      state.hasVendorChanges = false;
    },

    // Section visibility management
    toggleSectionVisibility: (state, action) => {
      const { section } = action.payload;
      state.sectionVisibility[section] = !state.sectionVisibility[section];

      // Update the editing vendor's sectionVisibility
      if (state.vendorEditing) {
        if (!state.vendorEditing.sectionVisibility) {
          state.vendorEditing.sectionVisibility = {
            ...state.sectionVisibility,
          };
        }
        state.vendorEditing.sectionVisibility[section] =
          state.sectionVisibility[section];

        state.vendorChanges.sectionVisibility = {
          old: state.vendorOriginal?.sectionVisibility || {},
          new: state.vendorEditing.sectionVisibility,
        };

        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(
            v => v.id === state.vendorEditing.id
          );
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex].sectionVisibility =
              state.vendorEditing.sectionVisibility;
          }
        }

        state.hasVendorChanges = true;
      }
    },

    updateCustomSectionVisibility: (state, action) => {
      const { sectionId, visible } = action.payload;
      state.customSectionVisibility[sectionId] = visible;

      if (state.vendorEditing) {
        if (!state.vendorEditing.customSectionVisibility) {
          state.vendorEditing.customSectionVisibility = {};
        }
        state.vendorEditing.customSectionVisibility[sectionId] = visible;

        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(
            v => v.id === state.vendorEditing.id
          );
          if (vendorIndex !== -1) {
            if (!state.vendors[vendorIndex].customSectionVisibility) {
              state.vendors[vendorIndex].customSectionVisibility = {};
            }
            state.vendors[vendorIndex].customSectionVisibility[sectionId] =
              visible;
          }
        }

        state.hasVendorChanges = true;
      }
    },

    // Booking management
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },

    selectBooking: (state, action) => {
      const id = action.payload;
      state.selectedBooking = state.bookings.find(b => b.id === id) || null;
    },

    setEditingBooking: (state, action) => {
      const bookingId = action.payload;
      const booking = state.bookings.find(b => b.id === bookingId);

      if (booking) {
        state.bookingEditing = { ...booking };
        state.bookingChanges = {};
        state.hasBookingChanges = false;
      }
    },

    updateBookingField: (state, action) => {
      const { field, value } = action.payload;

      if (state.bookingEditing) {
        state.bookingEditing[field] = value;
        state.bookingChanges[field] = value;
        state.hasBookingChanges = true;
      }
    },

    saveBookingChanges: state => {
      if (state.bookingEditing && state.hasBookingChanges) {
        const bookingIndex = state.bookings.findIndex(
          b => b.id === state.bookingEditing.id
        );

        if (bookingIndex !== -1) {
          state.bookings[bookingIndex] = { ...state.bookingEditing };
        }

        state.bookingChanges = {};
        state.hasBookingChanges = false;
        state.success = true;
      }
    },

    addBooking: (state, action) => {
      const newBooking = {
        ...action.payload,
        id: `booking-${Date.now()}`,
        bookingDate: new Date().toISOString().split('T')[0],
        status: 'pending',
      };
      state.bookings.push(newBooking);
    },

    refreshBookings: state => {
      state.bookings = getStaticWeddingBookings();
    },

    // Settings
    toggleRealTimeUpdates: state => {
      state.realTimeUpdates = !state.realTimeUpdates;
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
  setSearchQuery,
  setFilters,
  clearFilters,

  // Vendor actions
  setVendors,
  selectVendor,
  initializeVendor,
  loadVendorFromJson,
  refreshVendors,

  // Vendor editing actions
  setEditingVendor,
  updateVendorField,
  updateVendorImage,
  updateVendorContent,
  updateFooterData,
  saveVendorChanges,
  discardVendorChanges,
  clearEditingVendor,

  // Section visibility
  toggleSectionVisibility,
  updateCustomSectionVisibility,

  // Booking actions
  setBookings,
  selectBooking,
  setEditingBooking,
  updateBookingField,
  saveBookingChanges,
  addBooking,
  refreshBookings,

  // Settings
  toggleRealTimeUpdates,

  // Utility actions
  resetState,
} = weddingManagementSlice.actions;

// Selectors
export const selectVendors = state => state.weddingManagement.vendors;
export const selectSelectedVendor = state =>
  state.weddingManagement.selectedVendor;
export const selectEditingVendor = state =>
  state.weddingManagement.vendorEditing;
export const selectVendorOriginal = state =>
  state.weddingManagement.vendorOriginal;
export const selectHasVendorChanges = state =>
  state.weddingManagement.hasVendorChanges;
export const selectVendorChanges = state =>
  state.weddingManagement.vendorChanges;

export const selectBookings = state => state.weddingManagement.bookings;
export const selectSelectedBooking = state =>
  state.weddingManagement.selectedBooking;
export const selectEditingBooking = state =>
  state.weddingManagement.bookingEditing;
export const selectHasBookingChanges = state =>
  state.weddingManagement.hasBookingChanges;

export const selectSectionVisibility = state =>
  state.weddingManagement.sectionVisibility;
export const selectCustomSectionVisibility = state =>
  state.weddingManagement.customSectionVisibility;
export const selectFilters = state => state.weddingManagement.filters;
export const selectRealTimeUpdates = state =>
  state.weddingManagement.realTimeUpdates;

export const selectLoading = state => state.weddingManagement.loading;
export const selectError = state => state.weddingManagement.error;
export const selectSuccess = state => state.weddingManagement.success;

// Complex selectors
export const selectVendorById = vendorId => state =>
  state.weddingManagement.vendors.find(vendor => vendor.id === vendorId);

export const selectVendorsByCategory = category => state =>
  state.weddingManagement.vendors.filter(
    vendor => vendor.category === category
  );

export const selectFeaturedVendors = state =>
  state.weddingManagement.vendors.filter(vendor => vendor.featured);

export const selectFilteredVendors = state => {
  const { vendors, filters } = state.weddingManagement;
  let filtered = [...vendors];

  // Apply filters
  if (filters.city) {
    filtered = filtered.filter(vendor =>
      vendor.location?.city?.toLowerCase().includes(filters.city.toLowerCase())
    );
  }

  if (filters.state) {
    filtered = filtered.filter(vendor =>
      vendor.location?.state
        ?.toLowerCase()
        .includes(filters.state.toLowerCase())
    );
  }

  if (filters.category) {
    filtered = filtered.filter(vendor => vendor.category === filters.category);
  }

  if (filters.featured) {
    filtered = filtered.filter(vendor => vendor.featured);
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      vendor =>
        vendor.name?.toLowerCase().includes(query) ||
        vendor.description?.toLowerCase().includes(query) ||
        vendor.category?.toLowerCase().includes(query)
    );
  }

  return filtered;
};

export const selectVisibleSections = state =>
  Object.entries(state.weddingManagement.sectionVisibility)
    .filter(([_, visible]) => visible)
    .map(([section, _]) => section);

export default weddingManagementSlice.reducer;
