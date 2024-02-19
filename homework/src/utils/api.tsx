export const genToken = async (): Promise<string> => {
  const response = await fetch(import.meta.env.VITE_ED_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) throw new Error('Error fetching token');

  const { data } = await response.json();
  return data;
};

export const search = async (token: string): Promise<[]> => {
  const response = await fetch(import.meta.env.VITE_ED_SEARCH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Error fetching data');

  const { data } = await response.json();
  return data;
};
