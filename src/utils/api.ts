import { Feature, Polygon } from 'geojson';
import { SearchParams } from './transform';

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

  const { access_token } = await response.json();
  localStorage.setItem('access_token', access_token);
  return access_token;
};

export const search = async (
  params: SearchParams
): Promise<Feature<Polygon>[]> => {
  let token = localStorage.getItem('access_token');
  if (!token) token = await genToken();

  const response = await fetch(import.meta.env.VITE_ED_SEARCH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...params }),
  });

  if (!response.ok) throw new Error('Error fetching data');

  const { features } = await response.json();
  return features;
};
