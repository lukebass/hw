import { FeatureCollection, Polygon } from 'geojson';
import { SearchParams } from './transform';
import dayjs from 'dayjs';

export const genToken = async (): Promise<string> => {
  const response = await fetch(import.meta.env.VITE_ED_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: import.meta.env.VITE_ED_CLIENT_ID,
      client_secret: import.meta.env.VITE_ED_CLIENT_SECRET,
    }),
  });

  if (!response.ok) throw new Error('Error fetching token');

  const { access_token, expires_in } = await response.json();
  localStorage.setItem(
    'access_token',
    JSON.stringify({
      token: access_token,
      expires: dayjs().add(expires_in, 'second'),
    })
  );
  return access_token;
};

export const getToken = (): Promise<string> => {
  const currToken = localStorage.getItem('access_token');
  if (!currToken) return genToken();
  const { token, expires } = JSON.parse(currToken);
  if (dayjs() >= dayjs(expires)) return genToken();
  return token;
};

export const search = async (
  params: SearchParams
): Promise<FeatureCollection<Polygon>> => {
  const token = await getToken();

  const response = await fetch(import.meta.env.VITE_ED_SEARCH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...params }),
  });

  if (!response.ok) throw new Error('Error fetching data');

  const data = await response.json();
  return data;
};
