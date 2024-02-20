import { createContext, useState } from 'react';
import { genToken, search } from '../utils/api';
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
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async (form: Form, feature: Feature<Polygon>) => {
    setError(null);
    setIsFetching(true);

    // try {
    //   let currToken = token;
    //   if (!currToken) {
    //     currToken = await genToken();
    //     setToken(currToken);
    //   }

    //   const data = await search(currToken);
    //   setData(data);
    // } catch (error) {
    //   if (error instanceof Error) setError(error.message);
    //   else setError('Error fetching data');
    // }

    console.log(transform(form, feature));

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
