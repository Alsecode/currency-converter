import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.ids.push(action.payload);
    },
    addFavorites: (state, action) => {
      state.ids = action.payload;
    },
    removeFavorite: (state, action) => {
      state.ids = state.ids.filter((item) => item !== action.payload);
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
