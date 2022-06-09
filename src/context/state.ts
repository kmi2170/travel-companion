import { BoundsType, CoordsType } from '../api/type_settings';

export const initialState = {
  init_coords: { lat: null, lng: null },
  coords: { lat: null, lng: null },
  bounds: { ne: { lat: null, lng: null }, sw: { lat: null, lng: null } },
  list_places: null,
  filtered_list_places: null,
  list_weather: null,
  type: 'restaurants',
  rating: 0,
  popups: { selected: null },
  isLoading: false,
};

export type StateType = {
  init_coords: CoordsType;
  coords: CoordsType;
  bounds: BoundsType;
  list_places: [] | null;
  filtered_list_places: [] | null;
  list_weather: [] | null;
  type: string;
  rating: number;
  popups: {
    selected: number;
  };
  isLoading: boolean;
};
