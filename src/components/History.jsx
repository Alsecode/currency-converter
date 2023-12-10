import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTranslation } from 'react-i18next';

const generateListItem = ({
  id, date, fromCurrency, toCurrency, amount, result,
}) => (
  <ListItem key={id}>
    <ListItemText
      primary={`${amount} ${fromCurrency} ≈ ${result} ${toCurrency}`}
      secondary={date}
    />
  </ListItem>
);

const History = ({ items }) => {
  const { t } = useTranslation();
  if (items.length === 0) {
    return null;
  }
  return (
    <Box>
      <Typography variant="h5" sx={{ marginY: 2 }}>
        {t('historyHeader')}
      </Typography>
      <List>
        {items.map((data) => generateListItem(data))}
      </List>
    </Box>
  );
};

export default History;
