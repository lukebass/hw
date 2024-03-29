import { Box, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

interface DatesProps {
  title: string;
  start: {
    id: string;
    value: Dayjs | null;
    props: {
      required: boolean;
      helperText: string | boolean;
    };
  };
  end: {
    id: string;
    value: Dayjs | null;
    props: {
      required: boolean;
      helperText: string | boolean;
    };
  };
  onChange: (id: string, value: Dayjs | null) => void;
}

const Dates = ({ title, start, end, onChange }: DatesProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DatePicker
            label='Start Date'
            value={start.value}
            onChange={(value) => onChange(start.id, value)}
            sx={{ width: '100%' }}
            maxDate={end.value}
            slotProps={{ textField: { ...start.props } }}
            disableFuture
          />
        </Grid>

        <Grid item xs={6}>
          <DatePicker
            label='End Date'
            value={end.value}
            onChange={(value) => onChange(end.id, value)}
            sx={{ width: '100%' }}
            minDate={start.value}
            slotProps={{ textField: { ...start.props } }}
            disableFuture
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dates;
