import { Box, Grid, Typography } from '@mui/material';
import Map, { GeolocateControl } from 'react-map-gl';
import { Feature } from 'geojson';
import MapControl from './MapControl';

interface RegionsProps {
  title: string;
  onCreate: (event: { features: Feature[] }) => void;
  onUpdate: (event: { features: Feature[]; action: string }) => void;
  onDelete: (event: { features: Feature[] }) => void;
}

const Regions: React.FC<RegionsProps> = ({
  title,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
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
            <MapControl
              position='top-left'
              displayControlsDefault={false}
              controls={{ polygon: true, trash: true }}
              defaultMode='draw_polygon'
              onCreate={onCreate}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </Map>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Regions;
