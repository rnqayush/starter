import { createSlice } from '@reduxjs/toolkit';
import { getStaticWeddingVendors, getStaticWeddingBookings } from '../../utils/weddingAPI';

const initialState = {
  // Vendor management
  vendors: getStaticWeddingVendors(),
  editingVendor: null,
  originalVendor: null,
  vendorChanges: {},
  hasUnsavedVendorChanges: false,
  activeVendorId: null,
  
  // Booking management
  bookings: getStaticWeddingBookings(),
  editingBooking: null,
  bookingChanges: {},
  hasUnsavedBookingChanges: false,
  activeBookingId: null,
  
  // UI state
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
  
  // Loading states
  loading: {
    vendors: false,
    bookings: false,
    updating: false,
    saving: false,
  },
  
  // Error states
  errors: {
    vendors: null,
    bookings: null,
    updating: null,
    saving: null,
  },
  
  // Filter and search state
  filters: {
    city: '',
    state: '',
    featured: false,
    searchQuery: '',
    category: '',
  },
  
  // Real-time updates flag
  realTimeUpdates: true,
};

const weddingManagementSlice = createSlice({
  name: 'weddingManagement',
  initialState,
  reducers: {
    // Vendor management actions
    setEditingVendor: (state, action) => {
      const vendorId = action.payload;
      let vendor = state.vendors.find(v => v.id === vendorId);

      if (!vendor) {
        console.warn(`Vendor with id ${vendorId} not found in Redux state`);
        state.editingVendor = null;
        state.originalVendor = null;
      } else {
        state.editingVendor = { ...vendor };
        state.originalVendor = { ...vendor };
      }

      state.activeVendorId = vendorId;
      state.vendorChanges = {};
      state.hasUnsavedVendorChanges = false;
    },

    updateVendorField: (state, action) => {
      const { field, value } = action.payload;
      if (state.editingVendor) {
        state.editingVendor[field] = value;
        state.vendorChanges[field] = {
          old: state.originalVendor[field],
          new: value,
        };
        state.hasUnsavedVendorChanges = true;
        
        // If real-time updates are enabled, immediately update the vendor in the vendors array
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex] = { ...state.editingVendor };
          }
        }
      }
    },

    updateVendorImage: (state, action) => {
      const { field, url } = action.payload;
      if (state.editingVendor) {
        state.editingVendor[field] = url;
        state.vendorChanges[field] = {
          old: state.originalVendor[field],
          new: url,
        };
        state.hasUnsavedVendorChanges = true;
        
        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex][field] = url;
          }
        }
      }
    },

    updateVendorGallery: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.gallery = action.payload;
        state.vendorChanges.gallery = {
          old: state.originalVendor.gallery,
          new: action.payload,
        };
        state.hasUnsavedVendorChanges = true;
        
        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex].gallery = action.payload;
          }
        }
      }
    },

    updateServices: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.services = action.payload;
        state.vendorChanges.services = {
          old: state.originalVendor.services,
          new: action.payload,
        };
        state.hasUnsavedVendorChanges = true;
        
        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex].services = action.payload;
          }
        }
      }
    },

    updateTestimonials: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.testimonials = action.payload;
        state.vendorChanges.testimonials = {
          old: state.originalVendor.testimonials,
          new: action.payload,
        };
        state.hasUnsavedVendorChanges = true;
        
        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex].testimonials = action.payload;
          }
        }
      }
    },

    updatePackages: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.packages = action.payload;
        state.vendorChanges.packages = {
          old: state.originalVendor.packages,
          new: action.payload,
        };
        state.hasUnsavedVendorChanges = true;
        
        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex].packages = action.payload;
          }
        }
      }
    },

    updateRecentWork: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.locationPortfolio = action.payload;
        state.vendorChanges.locationPortfolio = {
          old: state.originalVendor.locationPortfolio,
          new: action.payload,
        };
        state.hasUnsavedVendorChanges = true;
        
        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex].locationPortfolio = action.payload;
          }
        }
      }
    },

    updateCustomSections: (state, action) => {
      if (state.editingVendor) {
        state.editingVendor.customSections = action.payload;
        state.vendorChanges.customSections = {
          old: state.originalVendor.customSections || [],
          new: action.payload,
        };
        state.hasUnsavedVendorChanges = true;

        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex].customSections = action.payload;
          }
        }
      }
    },

    updateFooterData: (state, action) => {
      if (state.editingVendor) {
        const { footerData } = action.payload;

        // Update footer-related fields in editing vendor
        state.editingVendor.footerColumns = footerData.columns;
        state.editingVendor.footerCopyright = footerData.copyrightText;
        state.editingVendor.footerBackgroundColor = footerData.backgroundColor;
        state.editingVendor.footerTextColor = footerData.textColor;
        state.editingVendor.footerDescription = footerData.description;

        // Update social links (they can be used in both contact and footer sections)
        state.editingVendor.socialLinks = footerData.socialLinks;

        // Track changes
        state.vendorChanges.footerColumns = {
          old: state.originalVendor.footerColumns || [],
          new: footerData.columns,
        };
        state.vendorChanges.footerCopyright = {
          old: state.originalVendor.footerCopyright || '',
          new: footerData.copyrightText,
        };
        state.vendorChanges.footerBackgroundColor = {
          old: state.originalVendor.footerBackgroundColor || '#1f2937',
          new: footerData.backgroundColor,
        };
        state.vendorChanges.footerTextColor = {
          old: state.originalVendor.footerTextColor || '#ffffff',
          new: footerData.textColor,
        };
        state.vendorChanges.socialLinks = {
          old: state.originalVendor.socialLinks || {},
          new: footerData.socialLinks,
        };

        state.hasUnsavedVendorChanges = true;

        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex].footerColumns = footerData.columns;
            state.vendors[vendorIndex].footerCopyright = footerData.copyrightText;
            state.vendors[vendorIndex].footerBackgroundColor = footerData.backgroundColor;
            state.vendors[vendorIndex].footerTextColor = footerData.textColor;
            state.vendors[vendorIndex].footerDescription = footerData.description;
            state.vendors[vendorIndex].socialLinks = footerData.socialLinks;
          }
        }
      }
    },

    saveVendorChanges: (state) => {
      if (state.editingVendor && state.hasUnsavedVendorChanges) {
        const vendorIndex = state.vendors.findIndex(
          v => v.id === state.editingVendor.id
        );
        if (vendorIndex !== -1) {
          state.vendors[vendorIndex] = { ...state.editingVendor };
        }
        state.originalVendor = { ...state.editingVendor };
        state.vendorChanges = {};
        state.hasUnsavedVendorChanges = false;
      }
    },

    discardVendorChanges: (state) => {
      if (state.originalVendor) {
        state.editingVendor = { ...state.originalVendor };
        state.vendorChanges = {};
        state.hasUnsavedVendorChanges = false;
        
        // Revert real-time changes if they were applied
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.originalVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex] = { ...state.originalVendor };
          }
        }
      }
    },

    initializeVendor: (state, action) => {
      const vendor = action.payload;
      const existingVendor = state.vendors.find(v => v.id === vendor.id);

      if (!existingVendor) {
        state.vendors.push(vendor);
      }
    },

    clearEditingVendor: (state) => {
      state.editingVendor = null;
      state.originalVendor = null;
      state.vendorChanges = {};
      state.hasUnsavedVendorChanges = false;
      state.activeVendorId = null;
    },

    // Section visibility management
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
        state.vendorChanges.sectionVisibility = {
          old: state.originalVendor?.sectionVisibility || {},
          new: state.editingVendor.sectionVisibility,
        };
        
        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            state.vendors[vendorIndex].sectionVisibility = state.editingVendor.sectionVisibility;
          }
        }
      }

      state.hasUnsavedVendorChanges = true;
    },

    updateCustomSectionVisibility: (state, action) => {
      const { sectionId, visible } = action.payload;
      state.customSectionVisibility[sectionId] = visible;
      
      if (state.editingVendor) {
        if (!state.editingVendor.customSectionVisibility) {
          state.editingVendor.customSectionVisibility = {};
        }
        state.editingVendor.customSectionVisibility[sectionId] = visible;
        
        // Real-time update
        if (state.realTimeUpdates) {
          const vendorIndex = state.vendors.findIndex(v => v.id === state.editingVendor.id);
          if (vendorIndex !== -1) {
            if (!state.vendors[vendorIndex].customSectionVisibility) {
              state.vendors[vendorIndex].customSectionVisibility = {};
            }
            state.vendors[vendorIndex].customSectionVisibility[sectionId] = visible;
          }
        }
        
        state.hasUnsavedVendorChanges = true;
      }
    },

    // Booking management actions
    setEditingBooking: (state, action) => {
      const bookingId = action.payload;
      const booking = state.bookings.find(b => b.id === bookingId);
      
      if (booking) {
        state.editingBooking = { ...booking };
        state.activeBookingId = bookingId;
        state.bookingChanges = {};
        state.hasUnsavedBookingChanges = false;
      }
    },

    updateBookingField: (state, action) => {
      const { field, value } = action.payload;
      if (state.editingBooking) {
        state.editingBooking[field] = value;
        state.bookingChanges[field] = value;
        state.hasUnsavedBookingChanges = true;
      }
    },

    saveBookingChanges: (state) => {
      if (state.editingBooking && state.hasUnsavedBookingChanges) {
        const bookingIndex = state.bookings.findIndex(
          b => b.id === state.editingBooking.id
        );
        if (bookingIndex !== -1) {
          state.bookings[bookingIndex] = { ...state.editingBooking };
        }
        state.bookingChanges = {};
        state.hasUnsavedBookingChanges = false;
      }
    },

    addBooking: (state, action) => {
      const newBooking = {
        ...action.payload,
        id: `booking-${Date.now()}`,
        bookingDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      state.bookings.push(newBooking);
    },

    // Filter and search actions
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {
        city: '',
        state: '',
        featured: false,
        searchQuery: '',
        category: '',
      };
    },

    // Settings
    toggleRealTimeUpdates: (state) => {
      state.realTimeUpdates = !state.realTimeUpdates;
    },

    // Loading and error states
    setLoading: (state, action) => {
      const { type, loading } = action.payload;
      state.loading[type] = loading;
    },

    setError: (state, action) => {
      const { type, error } = action.payload;
      state.errors[type] = error;
    },

    clearError: (state, action) => {
      const { type } = action.payload;
      state.errors[type] = null;
    },

    clearAllErrors: (state) => {
      state.errors = {
        vendors: null,
        bookings: null,
        updating: null,
        saving: null,
      };
    },

    // Data refresh
    refreshVendors: (state) => {
      state.vendors = getStaticWeddingVendors();
    },

    refreshBookings: (state) => {
      state.bookings = getStaticWeddingBookings();
    },
  },
});

export const {
  // Vendor management
  setEditingVendor,
  updateVendorField,
  updateVendorImage,
  updateVendorGallery,
  updateServices,
  updateTestimonials,
  updatePackages,
  updateRecentWork,
  updateCustomSections,
  updateFooterData,
  saveVendorChanges,
  discardVendorChanges,
  initializeVendor,
  clearEditingVendor,
  
  // Section visibility
  toggleSectionVisibility,
  updateCustomSectionVisibility,
  
  // Booking management
  setEditingBooking,
  updateBookingField,
  saveBookingChanges,
  addBooking,
  
  // Filters and search
  updateFilters,
  clearFilters,
  
  // Settings
  toggleRealTimeUpdates,
  
  // Loading and errors
  setLoading,
  setError,
  clearError,
  clearAllErrors,
  
  // Data refresh
  refreshVendors,
  refreshBookings,
} = weddingManagementSlice.actions;

export default weddingManagementSlice.reducer;
