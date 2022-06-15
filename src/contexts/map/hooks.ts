import { useContext, useReducer } from 'react';
import { StateContext, DispatchContext, DispatchContextType } from './index';
import { initialState, State } from './state';
import { reducer } from './reducer';
import { actionTypes, ActionType } from './actions';

export const useMapStateContext = () => {
  return useContext<State>(StateContext);
};

export const useMapDispatchContext = () => {
  return useContext<DispatchContextType>(DispatchContext);
};

type Payload<T> = Extract<ActionType, { type: T }>['payload'];

export const useMapContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMapInitCoords = (payload: Payload<'SET_INIT_COORDS'>) => {
    return dispatch({ type: actionTypes.SET_INIT_COORDS, payload });
  };
  const setMapCoords = (payload: Payload<'SET_COORDS'>) => {
    return dispatch({ type: actionTypes.SET_COORDS, payload });
  };
  const setMapBounds = (payload: Payload<'SET_BOUNDS'>) => {
    return dispatch({ type: actionTypes.SET_BOUNDS, payload });
  };
  const setMapSelectedPopup = (payload: Payload<'SET_POPUP_SELECTED'>) => {
    return dispatch({ type: actionTypes.SET_POPUP_SELECTED, payload });
  };

  return {
    state,
    setMapInitCoords,
    setMapCoords,
    setMapBounds,
    setMapSelectedPopup,
  };
};
