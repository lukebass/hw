import { Box, TextField, Grid, Typography } from '@mui/material';

interface CoordsProps {
  title: string;
  lat: {
    id: string;
    value: string;
  };
  lon: {
    id: string;
    value: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Coords: React.FC<CoordsProps> = ({ title, lat, lon, onChange }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id={lat.id}
            label='Latitude'
            type='number'
            value={lat.value}
            onChange={onChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id={lon.id}
            label='Longitude'
            type='number'
            value={lon.value}
            onChange={onChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Coords;
