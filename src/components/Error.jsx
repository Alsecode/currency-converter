import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useTranslation } from 'react-i18next';

const Error = () => {
  const { t } = useTranslation();
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 300, color: '#f04435' }} />
      <Typography variant="h5">{t('error')}</Typography>
    </Container>
  );
};

export default Error;
