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
  Stack,
} from '@mui/material';
import Map, { GeolocateControl } from 'react-map-gl';
import { Feature, Polygon } from 'geojson';
import MapControl from './MapControl';

interface RegionsProps {
  title: string;
  selected: Feature<Polygon>[];
  onCreate: (event: { features: Feature<Polygon>[] }) => void;
  onUpdate: (event: { features: Feature<Polygon>[] }) => void;
  onDelete: (event: { features: Feature<Polygon>[] }) => void;
}

const Regions: React.FC<RegionsProps> = ({
  title,
  selected,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const regions = useMemo(
    () =>
      selected.map(({ id, geometry: { coordinates } }) => (
        <TableRow key={id}>
          <TableCell>{id}</TableCell>
          <TableCell>
            <Stack spacing={1}>
              {coordinates[0].map((coords, key) => (
                <Chip
                  key={key}
                  color='primary'
                  variant='outlined'
                  label={coords
                    .map((coord) => coord.toString().substring(0, 10))
                    .join(', ')}
                />
              ))}
            </Stack>
          </TableCell>
        </TableRow>
      )),
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
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Coordinates</TableCell>
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

export default Regions;
