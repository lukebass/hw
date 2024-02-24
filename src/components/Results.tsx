import { useContext, useEffect, useMemo, useState } from 'react';
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
  Link,
  CircularProgress,
  Alert,
} from '@mui/material';
import Map, { Source, Layer, FillLayer } from 'react-map-gl';
import { Position } from 'geojson';
import DataContext from '../context/Data';

const layerStyle: FillLayer = {
  id: 'fill',
  type: 'fill',
  paint: {
    'fill-opacity': 0.5,
    'fill-color': 'blue',
  },
};

const Results: React.FC = () => {
  const { data, isFetching, error, clearError } = useContext(DataContext);
  const [viewState, setViewState] = useState({
    latitude: 49.2827,
    longitude: -123.1207,
    zoom: 8,
  });

  useEffect(() => {
    if (data.features.length) {
      setViewState({
        latitude: data.features[0].geometry.coordinates[0][0][1],
        longitude: data.features[0].geometry.coordinates[0][0][0],
        zoom: 8,
      });
    }
  }, [data]);

  const handleClick = (coordinates: Position[][]) => {
    setViewState({
      latitude: coordinates[0][0][1],
      longitude: coordinates[0][0][0],
      zoom: 8,
    });
  };

  const results = useMemo(
    () =>
      data.features.length ? (
        data.features.map(({ id, geometry: { coordinates }, properties }) => (
          <TableRow key={id}>
            <TableCell>
              <Link component='button' onClick={() => handleClick(coordinates)}>
                {id}
              </Link>
            </TableCell>
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
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} align='center'>
            {isFetching ? <CircularProgress size={52} /> : 'No data found!'}
          </TableCell>
        </TableRow>
      ),
    [data, isFetching]
  );

  return (
    <Box sx={{ my: 4 }}>
      {!!error && (
        <Alert severity='error' onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ height: 600 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
      >
        <Source type='geojson' data={data}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </Box>
  );
};

export default Results;
