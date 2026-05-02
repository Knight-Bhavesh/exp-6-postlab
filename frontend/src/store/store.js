import { configureStore } from '@reduxjs/toolkit';

// Placeholder for slices that will be created
import moviesReducer from './slices/moviesSlice';
import bookingReducer from './slices/bookingSlice';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    booking: bookingReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});
