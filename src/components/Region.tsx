import { useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
} from '@mui/material';
import Map, { GeolocateControl } from 'react-map-gl';
import { Feature, Polygon } from 'geojson';
import MapControl from './MapControl';

interface RegionProps {
  title: string;
  selected: Feature<Polygon> | null;
  onUpdate: (event: { features: Feature<Polygon>[] }) => void;
  onDelete: () => void;
}

const Region: React.FC<RegionProps> = ({
  title,
  selected,
  onUpdate,
  onDelete,
}) => {
  const regions = useMemo(
    () =>
      selected ? (
        selected.geometry.coordinates[0].map((coords, key) => (
          <TableRow key={key}>
            <TableCell>
              <Chip
                color='primary'
                variant='outlined'
                label={coords[1].toString().substring(0, 10)}
              />
            </TableCell>
            <TableCell>
              <Chip
                color='primary'
                variant='outlined'
                label={coords[0].toString().substring(0, 10)}
              />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={2} align='center'>
            No regions selected!
          </TableCell>
        </TableRow>
      ),
    [selected]
  );

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Map
            initialViewState={{
              latitude: 49.2827,
              longitude: -123.1207,
              zoom: 8,
            }}
            style={{ height: 400 }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
          >
            <GeolocateControl />
            <MapControl
              position='top-left'
              displayControlsDefault={false}
              controls={{ polygon: true, trash: true }}
              defaultMode='draw_polygon'
              onCreate={onUpdate}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </Map>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{regions}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Region;
