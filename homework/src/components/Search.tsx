import { useState, useContext } from 'react';
import { Button, Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import DataContext from '../context/Data';
import Dates from './Dates';
import Coords from './Coords';

export interface Form {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  nwLat: string;
  nwLon: string;
  neLat: string;
  neLon: string;
  swLat: string;
  swLon: string;
  seLat: string;
  seLon: string;
}

const initial = {
  startDate: null,
  endDate: null,
  nwLat: '',
  nwLon: '',
  neLat: '',
  neLon: '',
  swLat: '',
  swLon: '',
  seLat: '',
  seLon: '',
};

const Search = () => {
  const { fetchData } = useContext(DataContext);
  const [form, setForm] = useState<Form>(initial);

  const handleDateChange = (id: string, value: Dayjs | null) => {
    setForm({ ...form, [id]: value });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const handleClear = () => setForm(initial);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(form);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ my: 4 }}>
      <Dates
        title='Date Range'
        start={{ id: 'startDate', value: form.startDate }}
        end={{ id: 'endDate', value: form.endDate }}
        onChange={handleDateChange}
      />

      <Coords
        title='NW Coords'
        lat={{ id: 'nwLat', value: form.nwLat }}
        lon={{ id: 'nwLon', value: form.nwLon }}
        onChange={handleChange}
      />

      <Coords
        title='NE Coords'
        lat={{ id: 'neLat', value: form.neLat }}
        lon={{ id: 'neLon', value: form.neLon }}
        onChange={handleChange}
      />

      <Coords
        title='SW Coords'
        lat={{ id: 'swLat', value: form.swLat }}
        lon={{ id: 'swLon', value: form.swLon }}
        onChange={handleChange}
      />

      <Coords
        title='SE Coords'
        lat={{ id: 'seLat', value: form.seLat }}
        lon={{ id: 'seLon', value: form.seLon }}
        onChange={handleChange}
      />

      <Button
        variant='contained'
        color='error'
        onClick={handleClear}
        sx={{ mr: 2 }}
      >
        Clear
      </Button>

      <Button type='submit' variant='contained'>
        Search
      </Button>
    </Box>
  );
};

export default Search;
