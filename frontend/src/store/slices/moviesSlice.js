import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/movies');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch movies');
    }
  }
);

const initialState = {
  movies: [],
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    genre: 'All',
    language: 'All'
  },
  selectedMovie: null
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action) => {
      const { type, value } = action.payload;
      state.filters[type] = value;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSearchTerm, setFilter, setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;

