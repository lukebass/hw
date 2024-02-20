import { useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Map from 'react-map-gl';
import DataContext from '../context/Data';

const Results = () => {
  const { data, error } = useContext(DataContext);
  console.log(data);
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Search Results
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          Data
        </Grid>

        <Grid item xs={12} sm={6}>
          <Map
            initialViewState={{
              latitude: 37.8,
              longitude: -122.4,
              zoom: 14,
            }}
            style={{ height: 600 }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Results;
