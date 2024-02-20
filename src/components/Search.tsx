import { useState, useContext, useCallback } from 'react';
import { Button, Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import { Feature, Polygon } from 'geojson';
import DataContext from '../context/Data';
import Dates from './Dates';
import Regions from './Regions';

export interface Form {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const initial = {
  startDate: null,
  endDate: null,
};

const Search = () => {
  const { fetchData } = useContext(DataContext);
  const [form, setForm] = useState<Form>(initial);
  const [features, setFeatures] = useState<Feature<Polygon>[]>([]);

  const handleCreate = useCallback(
    (event: { features: Feature<Polygon>[] }) => {
      setFeatures((currFeatures) => {
        const created: Feature<Polygon> = { ...event.features[0] };
        return [...currFeatures, created];
      });
    },
    []
  );

  const handleUpdate = useCallback(
    (event: { features: Feature<Polygon>[] }) => {
      setFeatures((currFeatures) => {
        const updated: Feature<Polygon> = { ...event.features[0] };
        return currFeatures.map((feature) => {
          if (feature.id === updated.id) return updated;
          return feature;
        });
      });
    },
    []
  );

  const handleDelete = useCallback(
    (event: { features: Feature<Polygon>[] }) => {
      setFeatures((currFeatures) => {
        const deleted: Feature<Polygon> = { ...event.features[0] };
        return currFeatures.filter((feature) => feature.id !== deleted.id);
      });
    },
    []
  );

  const handleChange = (id: string, value: Dayjs | null) => {
    setForm({ ...form, [id]: value });
  };

  const handleClear = () => {
    setForm(initial);
    setFeatures([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(form, features[0]);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ my: 4 }}>
      <Dates
        title='Date Range'
        start={{ id: 'startDate', value: form.startDate }}
        end={{ id: 'endDate', value: form.endDate }}
        onChange={handleChange}
      />

      <Regions
        title='Select Region'
        selected={features}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <Box sx={{ mt: 2 }}>
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
    </Box>
  );
};

export default Search;
