import { useEffect, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useDispatch } from 'react-redux';
import { actions as favoritesActions } from '../slices/favoritesSlice';

import FavoriteButton from './FavoriteButton';
import Exchange from './ExchangeInput';

const Row = ({ row, selected, favorites }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(false);
  }, [selected, favorites]);

  const handleToggleFavorite = () => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const updatedFavorites = existingFavorites.includes(row.id)
      ? existingFavorites.filter((item) => item !== row.id)
      : [...existingFavorites, row.id];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    if (updatedFavorites.includes(row.id)) {
      dispatch(favoritesActions.addFavorite(row.id));
    } else {
      dispatch(favoritesActions.removeFavorite(row.id));
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <FavoriteButton
            isFavorite={favorites.includes(row.id)}
            handleToggleFavorite={handleToggleFavorite}
          />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell align="right">{row.nominal}</TableCell>
        <TableCell align="right">{row.charCode}</TableCell>
        <TableCell align="right">{row.rate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Exchange currencyRow={row} selected={selected} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
