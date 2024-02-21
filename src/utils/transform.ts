import { Form } from '../components/Search';
import { Feature, Polygon } from 'geojson';

export interface SearchParams {
  datetime: string;
  intersects?: Polygon;
}

export const transform = (
  form: Form,
  feature: Feature<Polygon> | null
): SearchParams => {
  const transformed: SearchParams = {
    datetime: `${form.startDate?.toISOString()}/${form.endDate?.toISOString()}`,
  };

  if (feature) transformed.intersects = { ...feature.geometry };

  return transformed;
};
