import { Bounds, Coords } from '../../api/type_settings';

const initLatLng = { lat: null, lng: null };

export const initialState = {
  init_coords: initLatLng,
  coords: initLatLng,
  bounds: { ne: initLatLng, sw: initLatLng },
  popups: { selected: null },
  isLoading: false,
};

export type State = {
  init_coords: Coords;
  coords: Coords;
  bounds: Bounds;
  popups: { selected: number };
  isLoading: boolean;
};
