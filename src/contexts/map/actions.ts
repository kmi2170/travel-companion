import { Bounds, Coords } from "../../api/type_settings";

export const actionTypes = {
  SET_INIT_COORDS: 'SET_INIT_COORDS',
  SET_COORDS: 'SET_COORDS',
  SET_BOUNDS: 'SET_BOUNDS',
  SET_POPUP_SELECTED: 'SET_POPUP_SELECTED',
} as const

type Payload = {
  [actionTypes.SET_INIT_COORDS]: Coords;
  [actionTypes.SET_COORDS]: Coords;
  [actionTypes.SET_BOUNDS]: Bounds;
  [actionTypes.SET_POPUP_SELECTED]: { selected: number };
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? { type: Key }
  : { type: Key; payload: M[Key] };
};

export type ActionType = ActionMap<Payload>[keyof ActionMap<Payload>];
