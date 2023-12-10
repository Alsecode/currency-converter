import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useTranslation } from 'react-i18next';

const Selection = ({ currenciesNames, selected, setSelected }) => {
  const { t } = useTranslation();
  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="currency-selection">{t('selection.baseCurrency')}</InputLabel>
        <Select
          labelId="currency-selection"
          id="selection"
          value={selected}
          onChange={handleChange}
        >
          {currenciesNames.map((name) => (
            <MenuItem key={name} value={name}>{name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{t('selection.chooseBase')}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default Selection;
