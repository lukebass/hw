import { Form } from '../components/Search';

interface Transformed {
  datetime: string;
  intersects: {
    coordinates: number[][][];
    type: string;
  };
}

export const transform = (form: Form): Transformed => ({
  datetime: `${form.startDate?.toISOString()}/${form.endDate?.toISOString()}`,
  intersects: {
    coordinates: [
      [
        [parseInt(form.nwLat), parseInt(form.nwLon)],
        [parseInt(form.neLat), parseInt(form.neLon)],
        [parseInt(form.seLat), parseInt(form.seLon)],
        [parseInt(form.swLat), parseInt(form.swLon)],
        [parseInt(form.nwLat), parseInt(form.nwLon)],
      ],
    ],
    type: 'Polygon',
  },
});
