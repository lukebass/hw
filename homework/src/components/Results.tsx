import { Box, Grid, Typography } from '@mui/material';
import Map, { Marker, GeolocateControl } from 'react-map-gl';

const Results = () => {
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
          >
            <GeolocateControl />
          </Map>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Results;
