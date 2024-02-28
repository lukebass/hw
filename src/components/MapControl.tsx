import { useCallback } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';
import { ControlPosition } from 'react-map-gl';
import { Feature, Polygon } from 'geojson';

interface MapControlProps extends MapboxDraw.MapboxDrawOptions {
  position: ControlPosition;
  onCreate: (event: { features: Feature<Polygon>[] }) => void;
  onUpdate: (event: { features: Feature<Polygon>[] }) => void;
  onDelete: () => void;
}

const MapControl = (props: MapControlProps) => {
  const draw = useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
      map.on('draw.modechange', handleDelete);
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
      map.off('draw.modechange', handleDelete);
    },
    { position: props.position }
  );

  const handleDelete = useCallback(() => {
    if (draw.getMode() !== 'draw_polygon') return;
    const data = draw.getAll();
    if (data.features.length <= 1) return;

    const deleted = data.features[0];
    draw.delete(String(deleted.id));
    props.onDelete();
  }, []);

  return null;
};

export default MapControl;
