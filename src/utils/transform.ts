import { Form } from '../components/Search';
import { Feature, Polygon } from 'geojson';

export const transform = (
  form: Form,
  feature: Feature<Polygon> | undefined
) => {
  let transformed = {};
  if (form.startDate && form.endDate) {
    transformed = {
      ...transformed,
      datetime: `${form.startDate?.toISOString()}/${form.endDate?.toISOString()}`,
    };
  }

  if (feature) {
    transformed = {
      ...transformed,
      intersects: {
        ...feature.geometry,
      },
    };
  }

  return transformed;
};
