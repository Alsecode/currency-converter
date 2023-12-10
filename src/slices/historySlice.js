import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const historyAdapter = createEntityAdapter();

const initialState = historyAdapter.getInitialState();

const slice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addConversion: (state, action) => {
      const item = action.payload;
      const currentList = Object.values(state.entities);
      const updatedList = [item, ...currentList];
      historyAdapter.setAll(state, updatedList);
    },
    addConversions: historyAdapter.addMany,
  },
});

export const selectors = historyAdapter.getSelectors((state) => state.history);

export const { actions } = slice;

export default slice.reducer;
