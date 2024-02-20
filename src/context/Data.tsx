import { createContext, useState } from 'react';
import { search } from '../utils/api';
import { Form } from '../components/Search';
import { Feature, Polygon } from 'geojson';
import { transform } from '../utils/transform';

interface Data {
  data: object[];
  error: string | null;
  fetchData: (form: Form, feature: Feature<Polygon>) => void;
  isFetching: boolean;
}

const DataContext = createContext<Data>({
  data: [],
  error: null,
  fetchData: () => {},
  isFetching: false,
});

const DataProvider = ({ children }: { children: React.ReactElement }) => {
  const [data, setData] = useState<object[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async (form: Form, feature: Feature<Polygon>) => {
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
