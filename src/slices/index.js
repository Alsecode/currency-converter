import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './currenciesSlice';
import historyReducer from './historySlice';
import favoritesReducer from './favoritesSlice';

export default configureStore({
  reducer: {
    currencies: currenciesReducer,
    history: historyReducer,
    favorites: favoritesReducer,
  },
});
