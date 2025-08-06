import { createSlice } from '@reduxjs/toolkit';
import { hotels } from '../../DummyData';
import hotelJsonData from '../../DummyData/hotels.json';
import {
  createEntityState,
  createEditingState,
  createEntityReducers,
  createEditingReducers,
} from '../utils/sliceUtils';

// Initialize with hotel from JSON and fallback to dummy data
const initialHotels = hotelJsonData?.data?.hotel
  ? [hotelJsonData.data.hotel]
  : hotels;

// Initial state
const initialState = {
  // Live data (what users see)
  hotels: initialHotels,
  selectedHotel: null,
  
  // Editing state
  ...createEditingState(),
  
  // Section visibility
  sectionVisibility: {
    hero: true,
    about: true,
    features: true,
    gallery: true,
    amenities: true,
    contact: true,
    testimonials: true,
    footer: true,
  },
  
  // Publishing state
  lastPublished: null,
  
  // Loading and error states
  loading: false,
  error: null,
  success: false,
};

const hotelManagementSlice = createSlice({
  name: 'hotelManagement',
  initialState,
  reducers: {
    // Standard reducers
    ...createEntityReducers(),
    ...createEditingReducers(),

    // Hotel data management
    loadHotelData: (state, action) => {
      const hotelData = action.payload;
      const existingIndex = state.hotels.findIndex(h => h.id === hotelData.id);

      if (existingIndex !== -1) {
        state.hotels[existingIndex] = { ...hotelData };
      } else {
        state.hotels.push({ ...hotelData });
      }
    },

    setHotels: (state, action) => {
      state.hotels = action.payload;
    },

    selectHotel: (state, action) => {
      const id = action.payload;
      state.selectedHotel = state.hotels.find(h => h.id === id) || null;
    },

    // Editing management
    setEditingHotel: (state, action) => {
      const hotelId = action.payload;
      const hotel = state.hotels.find(h => h.id === hotelId);

      if (hotel) {
        state.editing = { ...hotel };
        state.original = { ...hotel };
        state.hasChanges = false;
        state.changes = {};

        // Initialize section visibility from hotel data
        if (hotel.sectionVisibility) {
          state.sectionVisibility = { ...hotel.sectionVisibility };
        }
      }
    },

    // Field updates
    updateHotelField: (state, action) => {
      const { field, value, section } = action.payload;
      
      if (state.editing) {
        if (section) {
          // Update nested section field
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
        } else {
          // Update top-level field
          state.editing[field] = value;
          state.changes[field] = {
            old: state.original?.[field],
            new: value,
          };
        }
        
        state.hasChanges = true;
      }
    },

    // Image management
    updateHotelImage: (state, action) => {
      const { index, url } = action.payload;
      
      if (state.editing) {
        if (index === 'main') {
          state.editing.image = url;
          state.changes.image = {
            old: state.original?.image,
            new: url,
          };
        } else {
          const newImages = [...(state.editing.images || [])];
          newImages[index] = url;
          state.editing.images = newImages;
          state.changes.images = {
            old: state.original?.images,
            new: newImages,
          };
        }
        state.hasChanges = true;
      }
    },

    addHotelImage: (state, action) => {
      if (state.editing) {
        const newImages = [...(state.editing.images || []), action.payload];
        state.editing.images = newImages;
        state.changes.images = {
          old: state.original?.images,
          new: newImages,
        };
        state.hasChanges = true;
      }
    },

    removeHotelImage: (state, action) => {
      if (state.editing) {
        const newImages = (state.editing.images || []).filter((_, index) => index !== action.payload);
        state.editing.images = newImages;
        state.changes.images = {
          old: state.original?.images,
          new: newImages,
        };
        state.hasChanges = true;
      }
    },

    // Content management
    updateHotelContent: (state, action) => {
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

    // Room management
    addRoom: (state, action) => {
      if (state.editing) {
        const newRooms = [...(state.editing.rooms || []), action.payload];
        state.editing.rooms = newRooms;
        state.changes.rooms = {
          old: state.original?.rooms,
          new: newRooms,
        };
        state.hasChanges = true;
      }
    },

    updateRoom: (state, action) => {
      const { roomId, updates } = action.payload;
      
      if (state.editing && state.editing.rooms) {
        const roomIndex = state.editing.rooms.findIndex(room => room.id === roomId);
        
        if (roomIndex !== -1) {
          state.editing.rooms[roomIndex] = {
            ...state.editing.rooms[roomIndex],
            ...updates,
          };
          state.changes.rooms = {
            old: state.original?.rooms,
            new: state.editing.rooms,
          };
          state.hasChanges = true;
        }
      }
    },

    removeRoom: (state, action) => {
      if (state.editing && state.editing.rooms) {
        const newRooms = state.editing.rooms.filter(room => room.id !== action.payload);
        state.editing.rooms = newRooms;
        state.changes.rooms = {
          old: state.original?.rooms,
          new: newRooms,
        };
        state.hasChanges = true;
      }
    },

    // Section visibility management
    toggleSectionVisibility: (state, action) => {
      const { section } = action.payload;
      state.sectionVisibility[section] = !state.sectionVisibility[section];

      // Update the editing hotel's sectionVisibility
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
    saveHotelChanges: (state) => {
      if (state.editing && state.hasChanges) {
        const hotelIndex = state.hotels.findIndex(h => h.id === state.editing.id);
        
        if (hotelIndex !== -1) {
          state.hotels[hotelIndex] = { ...state.editing };
        }
        
        state.original = { ...state.editing };
        state.changes = {};
        state.hasChanges = false;
        state.success = true;
      }
    },

    publishChanges: (state) => {
      if (state.editing) {
        const hotelIndex = state.hotels.findIndex(h => h.id === state.editing.id);
        
        if (hotelIndex !== -1) {
          state.hotels[hotelIndex] = { ...state.editing };
          state.original = { ...state.editing };
          state.lastPublished = new Date().toISOString();
          state.hasChanges = false;
          state.success = true;
        }
      }
    },

    discardHotelChanges: (state) => {
      if (state.original) {
        state.editing = { ...state.original };
        state.changes = {};
        state.hasChanges = false;
      }
    },

    clearEditingHotel: (state) => {
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
  
  // Hotel actions
  loadHotelData,
  setHotels,
  selectHotel,
  
  // Editing actions
  setEditingHotel,
  updateHotelField,
  updateHotelImage,
  addHotelImage,
  removeHotelImage,
  updateHotelContent,
  addRoom,
  updateRoom,
  removeRoom,
  saveHotelChanges,
  publishChanges,
  discardHotelChanges,
  clearEditingHotel,
  
  // Section management
  toggleSectionVisibility,
  
  // Utility actions
  resetState,
} = hotelManagementSlice.actions;

// Selectors
export const selectHotels = (state) => state.hotelManagement.hotels;
export const selectSelectedHotel = (state) => state.hotelManagement.selectedHotel;
export const selectEditingHotel = (state) => state.hotelManagement.editing;
export const selectSectionVisibility = (state) => state.hotelManagement.sectionVisibility;
export const selectHasChanges = (state) => state.hotelManagement.hasChanges;
export const selectChanges = (state) => state.hotelManagement.changes;
export const selectLoading = (state) => state.hotelManagement.loading;
export const selectError = (state) => state.hotelManagement.error;
export const selectSuccess = (state) => state.hotelManagement.success;
export const selectLastPublished = (state) => state.hotelManagement.lastPublished;

// Complex selectors
export const selectHotelById = (hotelId) => (state) =>
  state.hotelManagement.hotels.find(hotel => hotel.id === hotelId);

export const selectHotelBySlug = (slug) => (state) =>
  state.hotelManagement.hotels.find(hotel => hotel.slug === slug || hotel.id === parseInt(slug));

export const selectVisibleSections = (state) =>
  Object.entries(state.hotelManagement.sectionVisibility)
    .filter(([_, visible]) => visible)
    .map(([section, _]) => section);

export const selectHasPendingChanges = (state, hotelId) =>
  state.hotelManagement.editing?.id === hotelId && state.hotelManagement.hasChanges;

export default hotelManagementSlice.reducer;
