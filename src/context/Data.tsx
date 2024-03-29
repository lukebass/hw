import { createContext, useState } from 'react';
import { search } from '../utils/api';
import { Form } from '../components/Search';
import { Feature, Polygon, FeatureCollection } from 'geojson';
import { transform } from '../utils/transform';

interface Data {
  data: FeatureCollection<Polygon>;
  error: string | null;
  clearError: () => void;
  fetchData: (form: Form, feature: Feature<Polygon> | null) => void;
  isFetching: boolean;
}

const DataContext = createContext<Data>({
  data: {
    type: 'FeatureCollection',
    features: [],
  },
  error: null,
  clearError: () => {},
  fetchData: () => {},
  isFetching: false,
});

const DataProvider = ({ children }: { children: React.ReactElement }) => {
  const [data, setData] = useState<FeatureCollection<Polygon>>({
    type: 'FeatureCollection',
    features: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const clearError = () => setError(null);

  const fetchData = async (form: Form, feature: Feature<Polygon> | null) => {
    setData({ type: 'FeatureCollection', features: [] });
    setError(null);
    setIsFetching(true);

    try {
      const data = await search(transform(form, feature));
      setData(data);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError('Error fetching data');
    }

    setIsFetching(false);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        error,
        clearError,
        fetchData,
        isFetching,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider };
export default DataContext;
