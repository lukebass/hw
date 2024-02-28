import { useState, useContext, useCallback } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import { Dayjs } from 'dayjs';
import { Feature, Polygon } from 'geojson';
import DataContext from '../context/Data';
import Dates from './Dates';
import Region from './Region';

export interface Form {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const Search = () => {
  const { fetchData, isFetching } = useContext(DataContext);
  const [form, setForm] = useState<Form>({ startDate: null, endDate: null });
  const [polygon, setPolygon] = useState<Feature<Polygon> | null>(null);

  const handleUpdate = useCallback(
    (event: { features: Feature<Polygon>[] }) =>
      setPolygon({ ...event.features[0] }),
    []
  );

  const handleDelete = useCallback(() => setPolygon(null), []);

  const handleChange = (id: string, value: Dayjs | null) => {
    setForm({ ...form, [id]: value });
  };

  const handleClear = () => {
    setForm({ startDate: null, endDate: null });
    setPolygon(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(form, polygon);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ my: 4 }}>
      <Dates
        title='Date Range'
        start={{
          id: 'startDate',
          value: form.startDate,
          props: {
            required: true,
            helperText: 'This field is required',
          },
        }}
        end={{
          id: 'endDate',
          value: form.endDate,
          props: {
            required: true,
            helperText: 'This field is required',
          },
        }}
        onChange={handleChange}
      />

      <Region
        title='Select Region'
        selected={polygon}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='error'
          onClick={handleClear}
          sx={{ mr: 2 }}
        >
          Clear
        </Button>

        <Button type='submit' variant='contained' disabled={isFetching}>
          {isFetching ? <CircularProgress size={26} /> : 'Search'}
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
