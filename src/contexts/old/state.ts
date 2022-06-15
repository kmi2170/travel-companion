import { Bounds, Coords } from '../api/type_settings';

const initLatLng = { lat: null, lng: null };

export const initialState = {
  init_coords: initLatLng,
  coords: initLatLng,
  bounds: { ne: initLatLng, sw: initLatLng },
  list_sites: null,
  filtered_list_sites: null,
  list_weather: null,
  type: 'restaurants',
  rating: 0,
  popups: { selected: null },
  isLoading: false,
};

export type State = {
  init_coords: Coords;
  coords: Coords;
  bounds: Bounds;
  list_sites: [] | null;
  filtered_list_sites: [] | null;
  list_weather: [] | null;
  type: string;
  rating: number;
  popups: { selected: number };
  isLoading: boolean;
};
