import { CircularProgress, Container } from '@mui/material';

const LoadingSpinner = () => (
  <Container
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress color="inherit" />
  </Container>
);

export default LoadingSpinner;
