export const actionTypes = {
  SET_LIST_SITES: 'SET_LIST_SITES',
  SET_FILTERED_LIST_SITES: 'SET_FILTERED_LIST_SITES',
  SET_LIST_WEATHER: 'SET_LIST_WEATHER',
  SET_TYPE: 'SET_TYPE',
  SET_RATING: 'SET_RATING',
  SET_IS_LOADING: 'SET_IS_LOADING',
} as const

type Payload = {
  [actionTypes.SET_LIST_SITES]: [] | null;
  [actionTypes.SET_FILTERED_LIST_SITES]: [] | null;
  [actionTypes.SET_LIST_WEATHER]: [] | null;
  [actionTypes.SET_TYPE]: string;
  [actionTypes.SET_RATING]: number;
  [actionTypes.SET_IS_LOADING]: boolean;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? { type: Key }
  : { type: Key; payload: M[Key] };
};

export type ActionType = ActionMap<Payload>[keyof ActionMap<Payload>];
