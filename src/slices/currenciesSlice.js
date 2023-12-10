import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetch',
  async () => {
    const response = await axios.get(routes.getApiPath());
    const formattedData = Object.values(response.data.Valute);
    return formattedData;
  },
);

const currenciesAdapter = createEntityAdapter({
  selectId: (e) => e.ID,
});

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: currenciesAdapter.getInitialState({ loadingStatus: false, error: null }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        currenciesAdapter.addMany(state, action);
        state.loadingStatus = false;
        state.error = null;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      });
  },

});

export const selectors = currenciesAdapter.getSelectors((state) => state.currencies);

export const { actions } = currenciesSlice;

export default currenciesSlice.reducer;
