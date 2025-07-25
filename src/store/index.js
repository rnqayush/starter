import { configureStore } from '@reduxjs/toolkit';
import hotelManagementReducer from './slices/hotelManagementSlice';

export const store = configureStore({
  reducer: {
    hotelManagement: hotelManagementReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
