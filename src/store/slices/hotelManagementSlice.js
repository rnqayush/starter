import { createSlice } from '@reduxjs/toolkit';
import { hotels } from '../../DummyData/hotels';

const initialState = {
  hotels: hotels,
  editingHotel: null,
  originalHotel: null,
  changes: {},
  hasUnsavedChanges: false,
  activeHotelId: null,
  sectionVisibility: {
    hero: true,
    about: true,
    features: true,
    gallery: true,
    amenities: true,
    contact: true,
  },
};

const hotelManagementSlice = createSlice({
  name: 'hotelManagement',
  initialState,
  reducers: {
    setEditingHotel: (state, action) => {
      const hotel = state.hotels.find(h => h.id === action.payload);
      state.editingHotel = hotel ? { ...hotel } : null;
      state.originalHotel = hotel ? { ...hotel } : null;
      state.activeHotelId = action.payload;
      state.changes = {};
      state.hasUnsavedChanges = false;
    },

    updateHotelField: (state, action) => {
      const { field, value } = action.payload;
      if (state.editingHotel) {
        state.editingHotel[field] = value;
        state.changes[field] = {
          old: state.originalHotel[field],
          new: value
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateHotelImage: (state, action) => {
      const { index, url } = action.payload;
      if (state.editingHotel) {
        if (index === 'main') {
          state.editingHotel.image = url;
          state.changes.image = {
            old: state.originalHotel.image,
            new: url
          };
        } else {
          const newImages = [...state.editingHotel.images];
          newImages[index] = url;
          state.editingHotel.images = newImages;
          state.changes.images = {
            old: state.originalHotel.images,
            new: newImages
          };
        }
        state.hasUnsavedChanges = true;
      }
    },

    addHotelImage: (state, action) => {
      if (state.editingHotel) {
        const newImages = [...state.editingHotel.images, action.payload];
        state.editingHotel.images = newImages;
        state.changes.images = {
          old: state.originalHotel.images,
          new: newImages
        };
        state.hasUnsavedChanges = true;
      }
    },

    removeHotelImage: (state, action) => {
      if (state.editingHotel) {
        const newImages = state.editingHotel.images.filter((_, index) => index !== action.payload);
        state.editingHotel.images = newImages;
        state.changes.images = {
          old: state.originalHotel.images,
          new: newImages
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateAmenities: (state, action) => {
      if (state.editingHotel) {
        state.editingHotel.amenities = action.payload;
        state.changes.amenities = {
          old: state.originalHotel.amenities,
          new: action.payload
        };
        state.hasUnsavedChanges = true;
      }
    },

    updatePolicies: (state, action) => {
      if (state.editingHotel) {
        state.editingHotel.policies = action.payload;
        state.changes.policies = {
          old: state.originalHotel.policies,
          new: action.payload
        };
        state.hasUnsavedChanges = true;
      }
    },

    addRoom: (state, action) => {
      if (state.editingHotel) {
        const newRooms = [...state.editingHotel.rooms, action.payload];
        state.editingHotel.rooms = newRooms;
        state.changes.rooms = {
          old: state.originalHotel.rooms,
          new: newRooms
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateRoom: (state, action) => {
      const { roomId, updates } = action.payload;
      if (state.editingHotel) {
        const roomIndex = state.editingHotel.rooms.findIndex(room => room.id === roomId);
        if (roomIndex !== -1) {
          state.editingHotel.rooms[roomIndex] = {
            ...state.editingHotel.rooms[roomIndex],
            ...updates
          };
          state.changes.rooms = {
            old: state.originalHotel.rooms,
            new: state.editingHotel.rooms
          };
          state.hasUnsavedChanges = true;
        }
      }
    },

    removeRoom: (state, action) => {
      if (state.editingHotel) {
        const newRooms = state.editingHotel.rooms.filter(room => room.id !== action.payload);
        state.editingHotel.rooms = newRooms;
        state.changes.rooms = {
          old: state.originalHotel.rooms,
          new: newRooms
        };
        state.hasUnsavedChanges = true;
      }
    },

    saveChanges: (state) => {
      if (state.editingHotel && state.hasUnsavedChanges) {
        const hotelIndex = state.hotels.findIndex(h => h.id === state.editingHotel.id);
        if (hotelIndex !== -1) {
          state.hotels[hotelIndex] = { ...state.editingHotel };
        }
        state.originalHotel = { ...state.editingHotel };
        state.changes = {};
        state.hasUnsavedChanges = false;
      }
    },

    discardChanges: (state) => {
      if (state.originalHotel) {
        state.editingHotel = { ...state.originalHotel };
        state.changes = {};
        state.hasUnsavedChanges = false;
      }
    },

    clearEditingHotel: (state) => {
      state.editingHotel = null;
      state.originalHotel = null;
      state.changes = {};
      state.hasUnsavedChanges = false;
      state.activeHotelId = null;
    },

    toggleSectionVisibility: (state, action) => {
      const { section } = action.payload;
      state.sectionVisibility[section] = !state.sectionVisibility[section];

      // Also update the editing hotel's sectionVisibility
      if (state.editingHotel) {
        if (!state.editingHotel.sectionVisibility) {
          state.editingHotel.sectionVisibility = { ...state.sectionVisibility };
        }
        state.editingHotel.sectionVisibility[section] = state.sectionVisibility[section];
        state.changes.sectionVisibility = {
          old: state.originalHotel?.sectionVisibility || {},
          new: state.editingHotel.sectionVisibility
        };
      }

      state.hasUnsavedChanges = true;
    },

    updateFeatures: (state, action) => {
      if (state.editingHotel) {
        state.editingHotel.features = action.payload;
        state.changes.features = {
          old: state.originalHotel.features || [],
          new: action.payload
        };
        state.hasUnsavedChanges = true;
      }
    },

    addFeature: (state, action) => {
      if (state.editingHotel) {
        const newFeatures = [...(state.editingHotel.features || []), action.payload];
        state.editingHotel.features = newFeatures;
        state.changes.features = {
          old: state.originalHotel.features || [],
          new: newFeatures
        };
        state.hasUnsavedChanges = true;
      }
    },

    removeFeature: (state, action) => {
      if (state.editingHotel) {
        const newFeatures = state.editingHotel.features.filter((_, index) => index !== action.payload);
        state.editingHotel.features = newFeatures;
        state.changes.features = {
          old: state.originalHotel.features || [],
          new: newFeatures
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateAmenityCategories: (state, action) => {
      if (state.editingHotel) {
        state.editingHotel.amenityCategories = action.payload;
        state.changes.amenityCategories = {
          old: state.originalHotel.amenityCategories || [],
          new: action.payload
        };
        state.hasUnsavedChanges = true;
      }
    },

    addAmenityCategory: (state, action) => {
      if (state.editingHotel) {
        const newCategories = [...(state.editingHotel.amenityCategories || []), action.payload];
        state.editingHotel.amenityCategories = newCategories;
        state.changes.amenityCategories = {
          old: state.originalHotel.amenityCategories || [],
          new: newCategories
        };
        state.hasUnsavedChanges = true;
      }
    },

    addAmenityToCategory: (state, action) => {
      const { categoryIndex, amenity } = action.payload;
      if (state.editingHotel && state.editingHotel.amenityCategories) {
        const newCategories = [...state.editingHotel.amenityCategories];
        newCategories[categoryIndex].items.push(amenity);
        state.editingHotel.amenityCategories = newCategories;
        state.changes.amenityCategories = {
          old: state.originalHotel.amenityCategories || [],
          new: newCategories
        };
        state.hasUnsavedChanges = true;
      }
    },

    removeAmenityFromCategory: (state, action) => {
      const { categoryIndex, amenityIndex } = action.payload;
      if (state.editingHotel && state.editingHotel.amenityCategories) {
        const newCategories = [...state.editingHotel.amenityCategories];
        newCategories[categoryIndex].items.splice(amenityIndex, 1);
        state.editingHotel.amenityCategories = newCategories;
        state.changes.amenityCategories = {
          old: state.originalHotel.amenityCategories || [],
          new: newCategories
        };
        state.hasUnsavedChanges = true;
      }
    },
  },
});

export const {
  setEditingHotel,
  updateHotelField,
  updateHotelImage,
  addHotelImage,
  removeHotelImage,
  updateAmenities,
  updatePolicies,
  addRoom,
  updateRoom,
  removeRoom,
  saveChanges,
  discardChanges,
  clearEditingHotel,
  toggleSectionVisibility,
  updateFeatures,
  addFeature,
  removeFeature,
  updateAmenityCategories,
  addAmenityCategory,
  addAmenityToCategory,
  removeAmenityFromCategory,
} = hotelManagementSlice.actions;

export default hotelManagementSlice.reducer;
