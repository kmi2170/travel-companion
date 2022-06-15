export const initialState = {
  list_sites: null,
  filtered_list_sites: null,
  list_weather: null,
  type: 'restaurants',
  rating: 0,
  isLoading: false,
};

export type State = {
  list_sites: [] | null;
  filtered_list_sites: [] | null;
  list_weather: [] | null;
  type: string;
  rating: number;
  isLoading: boolean;
};
