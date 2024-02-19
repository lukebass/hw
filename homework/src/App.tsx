import { Container, Box, Divider } from '@mui/material';
import logo from './assets/logo.svg';
import Search from './components/Search';
import Results from './components/Results';

const App = () => {
  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <img src={logo} alt='EarthDaily' />
      </Box>
      <Search />
      <Divider />
      <Results />
    </Container>
  );
};

export default App;
