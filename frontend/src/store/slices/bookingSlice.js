import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const TICKET_PRICE = 250;

export const confirmBookingAsync = createAsyncThunk(
  'booking/confirm',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Booking failed');
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  'booking/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bookings/my');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch bookings');
    }
  }
);

const initialState = {
  selectedSeats: [],
  showTime: null,
  movieId: null,
  totalPrice: 0,
  history: [],
  loading: false,
  error: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    toggleSeat: (state, action) => {
      const seatId = action.payload;
      const index = state.selectedSeats.indexOf(seatId);
      if (index === -1) {
        state.selectedSeats.push(seatId);
      } else {
        state.selectedSeats.splice(index, 1);
      }
      state.totalPrice = state.selectedSeats.length * TICKET_PRICE;
    },
    setShowTime: (state, action) => {
      state.showTime = action.payload.time;
      state.movieId = action.payload.movieId;
    },
    clearBooking: (state) => {
      state.selectedSeats = [];
      state.showTime = null;
      state.movieId = null;
      state.totalPrice = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch History
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Confirm Booking
      .addCase(confirmBookingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.history.unshift(action.payload);
        state.selectedSeats = [];
        state.showTime = null;
        state.movieId = null;
        state.totalPrice = 0;
      })
      .addCase(confirmBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { toggleSeat, setShowTime, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

