import { createContext, useReducer, useMemo } from 'react';
import { CoordsType, BoundsType } from '../api/type_settings';

const initialState = {
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

type StateType = {
  init_coords: CoordsType;
  coords: CoordsType;
  bounds: BoundsType;
  list_places: [] | null;
  filtered_list_places: [] | null;
  list_weather: [] | null;
  type: string;
  rating: number;
  popups: {
    selected?: number;
  };
  isLoading: boolean;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum actionTypes {
  SET_INIT_COORDS = 'SET_INIT_COORDS',
  SET_COORDS = 'SET_COORDS',
  SET_BOUNDS = 'SET_BOUNDS',
  SET_LIST_PLACES = 'SET_LIST_PLACES',
  SET_FILTERED_LIST_PLACES = 'SET_FILTERED_LIST_PLACES',
  SET_LIST_WEATHER = 'SET_LIST_WEATHER',
  SET_TYPE = 'SET_TYPE',
  SET_RATING = 'SET_RATING',
  SET_POPUP_SELECTED = 'SET_POPUP_SELECTED',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

type PayloadType = {
  [actionTypes.SET_INIT_COORDS]: CoordsType;
  [actionTypes.SET_COORDS]: CoordsType;
  [actionTypes.SET_BOUNDS]: BoundsType;
  [actionTypes.SET_LIST_PLACES]: [] | null;
  [actionTypes.SET_FILTERED_LIST_PLACES]: [] | null;
  [actionTypes.SET_LIST_WEATHER]: [] | null;
  [actionTypes.SET_TYPE]: string;
  [actionTypes.SET_RATING]: number;
  [actionTypes.SET_POPUP_SELECTED]: { selected: number };
  [actionTypes.SET_IS_LOADING]: boolean;
};

export type ActionsType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];

export const ListPlacesContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionsType>;
}>({ state: initialState, dispatch: () => null });

export const reducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case actionTypes.SET_INIT_COORDS:
      return { ...state, init_coords: action.payload };
    case actionTypes.SET_COORDS:
      return { ...state, coords: action.payload };
    case actionTypes.SET_BOUNDS:
      return { ...state, bounds: action.payload };
    case actionTypes.SET_LIST_PLACES:
      return { ...state, list_places: action.payload };
    case actionTypes.SET_FILTERED_LIST_PLACES:
      return { ...state, filtered_list_places: action.payload };
    case actionTypes.SET_LIST_WEATHER:
      return { ...state, list_weather: action.payload };
    case actionTypes.SET_TYPE:
      return { ...state, type: action.payload };
    case actionTypes.SET_RATING:
      return { ...state, rating: action.payload };
    case actionTypes.SET_POPUP_SELECTED:
      return { ...state, popups: action.payload };
    case actionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const ListPlacesContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <ListPlacesContext.Provider value={contextValue}>
      {children}
    </ListPlacesContext.Provider>
  );
};

export default ListPlacesContextProvider;
