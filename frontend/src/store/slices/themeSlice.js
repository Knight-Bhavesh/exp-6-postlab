import { createSlice } from '@reduxjs/toolkit';

const storedTheme = localStorage.getItem('theme');
const initialDarkMode = storedTheme === 'dark' ? true : false;

const initialState = {
  isDarkMode: initialDarkMode,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
      
      // Update HTML class
      if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    initTheme: (state) => {
      if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
});

export const { toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;
