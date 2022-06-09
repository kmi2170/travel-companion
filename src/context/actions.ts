import { BoundsType, CoordsType } from "../api/type_settings";


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

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? { type: Key }
  : { type: Key; payload: M[Key] };
};

export type ActionsType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];
