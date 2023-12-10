import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useTranslation } from 'react-i18next';

import sortRows from '../helpers/sortRows';
import createData from '../helpers/createData';
import convert from '../helpers/convert';

import Row from './TableRow';

const CurrenciesTable = ({ currencies, selected, favorites }) => {
  const { t } = useTranslation();

  const selectedCurrencyInfo = currencies.find((item) => item.Name === selected);
  const convertToSelected = (value) => convert(value, selectedCurrencyInfo);

  const items = currencies.filter((item) => item !== selectedCurrencyInfo);
  const sortedItems = sortRows(items, Object.values(favorites));

  const rows = sortedItems.map(({
    Name, Nominal, CharCode, Value, ID,
  }) => {
    const convertedValue = convertToSelected(Value);
    return createData(Name, Nominal, CharCode, convertedValue, ID);
  });

  return (
    <TableContainer component={Paper} elevation={2} sx={{ maxWidth: 1 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{t('tableHeaders.favorites')}</TableCell>
            <TableCell>{t('tableHeaders.currency')}</TableCell>
            <TableCell align="right">{t('tableHeaders.nominal')}</TableCell>
            <TableCell align="right">{t('tableHeaders.charCode')}</TableCell>
            <TableCell align="right">{t('tableHeaders.rate')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} selected={selectedCurrencyInfo} favorites={favorites} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CurrenciesTable;
