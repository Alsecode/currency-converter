import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { fetchCurrencies, selectors as currenciesSelectors } from './slices/currenciesSlice';

import { selectors as historySelectors, actions as historyActions } from './slices/historySlice';

import { actions as favoritesActions } from './slices/favoritesSlice';

import Selection from './components/CurrencySelection';
import Table from './components/CurrenciesTable';
import History from './components/History';
import LoadingSpinner from './components/LoadingSpinner';
import Error from './components/Error';

const App = () => {
  const [currency, setCurrency] = useState('Евро');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
    const history = localStorage.getItem('conversionHistory');
    const favorites = localStorage.getItem('favorites');

    if (history !== null) {
      dispatch(historyActions.addConversions(JSON.parse(history)));
    }
    if (favorites !== null) {
      dispatch(favoritesActions.addFavorites(JSON.parse(favorites)));
    }
  }, [dispatch]);

  const currencies = useSelector(currenciesSelectors.selectAll);
  const currenciesNames = currencies.map((item) => item.Name);

  const historyItems = useSelector(historySelectors.selectAll);
  const favorites = useSelector((state) => state.favorites.ids);

  const currenciesData = useSelector((state) => state.currencies);

  if (currenciesData.loadingStatus === true) {
    return <LoadingSpinner />;
  }

  if (currenciesData.error !== null) {
    return <Error />;
  }

  return (
    <Container>
      <Box maxWidth="lg">
        <Selection
          currenciesNames={currenciesNames}
          selected={currency}
          setSelected={setCurrency}
        />
        <Table currencies={currencies} selected={currency} favorites={favorites} />
        <History items={historyItems} />
      </Box>
    </Container>
  );
};

export default App;
