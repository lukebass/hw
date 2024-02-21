import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';
import { ControlPosition } from 'react-map-gl';
import { Feature, Polygon } from 'geojson';

interface MapControlProps extends MapboxDraw.MapboxDrawOptions {
  position: ControlPosition;
  onCreate: (event: { features: Feature<Polygon>[] }) => void;
  onUpdate: (event: { features: Feature<Polygon>[]; action: string }) => void;
  onDelete: (event: { features: Feature<Polygon>[] }) => void;
}

const MapControl: React.FC<MapControlProps> = (props) => {
  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
    },
    { position: props.position }
  );

  return null;
};

export default MapControl;
