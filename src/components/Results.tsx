import { useContext, useMemo } from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
  Chip,
} from '@mui/material';
import Map, { Source, Layer, FillLayer } from 'react-map-gl';
import { FeatureCollection } from 'geojson';
import DataContext from '../context/Data';

const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-110.4847946167, 24.122844696045],
            [-110.16303253174, 24.122844696045],
            [-110.16303253174, 24.397663116455],
            [-110.4847946167, 24.397663116455],
            [-110.4847946167, 24.122844696045],
          ],
        ],
      },
      properties: {},
    },
  ],
};

const layerStyle: FillLayer = {
  id: 'fill',
  type: 'fill',
  paint: {
    'fill-opacity': 0.5,
    'fill-color': 'blue',
    'fill-outline-color': 'black',
  },
};

const Results = () => {
  const { data } = useContext(DataContext);
  console.log(data);

  const results = useMemo(
    () =>
      data.features.map(({ id, geometry: { coordinates }, properties }) => (
        <TableRow key={id}>
          <TableCell>{id}</TableCell>
          <TableCell>
            <Stack direction='row' spacing={1}>
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
          <TableCell>
            <Stack direction='row' spacing={1}>
              {properties?.['eo:bands'].map(({ name }: { name: string }) => (
                <Chip
                  key={name}
                  color='success'
                  variant='outlined'
                  label={name}
                />
              ))}
            </Stack>
          </TableCell>
        </TableRow>
      )),
    [data]
  );

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Search Results
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Coordinates</TableCell>
              <TableCell>Bands</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{results}</TableBody>
        </Table>
      </TableContainer>

      <Map
        initialViewState={{
          latitude: 24.122844696045,
          longitude: -110.4847946167,
          zoom: 8,
        }}
        style={{ height: 600 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
      >
        <Source type='geojson' data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </Box>
  );
};

export default Results;
