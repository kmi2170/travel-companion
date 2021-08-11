import { createContext, useReducer, useMemo } from 'react';
import { CoordsType, BoundsType } from '../api/type_settings';

const initialState = {
  coords: { lat: null, lng: null },
  bounds: { ne: { lat: null, lng: null }, sw: { lat: null, lng: null } },
  list_restaurants: null,
};

type StateType = {
  coords: CoordsType;
  bounds: BoundsType;
  list_restaurants: [];
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum actionTypes {
  SET_COORDS = 'SET_COORDS',
  SET_BOUNDS = 'SET_BOUNDS',
  SET_LIST_RESTAURANTS = 'SET_LIST_RESTAURANTS',
}

type PayloadType = {
  [actionTypes.SET_IS_MAP_FIRST_LOAD]: boolean;
  [actionTypes.SET_COORDS]: CoordsType;
  [actionTypes.SET_BOUNDS]: BoundsType;
  [actionTypes.SET_LIST_RESTAURANTS]: [];
};

export type ActionsType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];

export const ListRestaurantsContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionsType>;
}>({ state: initialState, dispatch: () => null });

export const reducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case actionTypes.SET_COORDS:
      return { ...state, coords: action.payload };
    case actionTypes.SET_BOUNDS:
      return { ...state, bounds: action.payload };
    case actionTypes.SET_LIST_RESTAURANTS:
      return { ...state, list_restaurants: action.payload };
    default:
      return state;
  }
};

const ListRestaurantsContextProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <ListRestaurantsContext.Provider value={contextValue}>
      {children}
    </ListRestaurantsContext.Provider>
  );
};

export default ListRestaurantsContextProvider;
