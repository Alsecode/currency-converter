import TextField from '@mui/material/TextField';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import getHistoryItem from '../helpers/getHistoryItem';

import { actions as historyActions } from '../slices/historySlice';

const Exchange = ({ currencyRow, selected }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { rate, nominal } = currencyRow;
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const handleChangeFrom = (e) => {
    const { value } = e.target;
    setFromValue(value);
    if (value === '') {
      setToValue('');
    } else {
      setToValue(((value / rate) * nominal).toFixed(4));
    }
  };

  const handleChangeTo = (e) => {
    const { value } = e.target;
    setToValue(value);
    if (value === '') {
      setFromValue('');
    } else {
      setFromValue((value * (rate / nominal)).toFixed(4));
    }
  };

  const saveConversion = (fromCurrency, toCurrency, amount, result) => {
    const date = new Date();
    const dataToSave = {
      fromCurrency, toCurrency, amount, result,
    };
    const item = getHistoryItem(date, dataToSave);
    const existingHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    localStorage.setItem('conversionHistory', JSON.stringify([item, ...existingHistory]));
    dispatch(historyActions.addConversion(item));
  };

  useEffect(() => {
    setFromValue(rate);
    setToValue(nominal);
  }, [selected, nominal, rate]);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 1,
    }}
    >
      <Box sx={{
        margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2,
      }}
      >
        <TextField
          id="fromInput"
          label={selected.Name}
          type="number"
          value={fromValue}
          onChange={handleChangeFrom}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <CurrencyExchangeOutlinedIcon />
        <TextField
          id="toInput"
          label={currencyRow.name}
          value={toValue}
          onChange={handleChangeTo}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Button
        variant="standard"
        sx={{
          width: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          background: '#fafafa',
        }}
        onClick={() => saveConversion(selected.Name, currencyRow.name, fromValue, toValue)}
      >
        <SaveOutlinedIcon />
        {t('saveBtn')}
      </Button>
    </Box>
  );
};

export default Exchange;
