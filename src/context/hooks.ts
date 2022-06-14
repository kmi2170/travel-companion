import { useContext, useReducer } from 'react';
import {
  TravelContext,
  TravelDispatchContext,
  TravelDispatchContextType,
} from './index';
import { initialState, State } from './state';
import { reducer } from './reducer';
import { actionTypes, ActionType } from './actions';

export const useTravelContext = () => {
  return useContext<State>(TravelContext);
};

export const useTravelDispatchContext = () => {
  return useContext<TravelDispatchContextType>(TravelDispatchContext);
};

type Payload<T> = Extract<ActionType, { type: T }>['payload'];

export const useTravelForContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIsLoading = (payload: Payload<'SET_IS_LOADING'>) => {
    return dispatch({ type: actionTypes.SET_IS_LOADING, payload });
  };
  const setInitCoords = (payload: Payload<'SET_INIT_COORDS'>) => {
    return dispatch({ type: actionTypes.SET_INIT_COORDS, payload });
  };
  const setCoords = (payload: Payload<'SET_COORDS'>) => {
    return dispatch({ type: actionTypes.SET_COORDS, payload });
  };
  const setBounds = (payload: Payload<'SET_BOUNDS'>) => {
    return dispatch({ type: actionTypes.SET_BOUNDS, payload });
  };
  const setFilteredSitesList = (
    payload: Payload<'SET_FILTERED_LIST_PLACES'>
  ) => {
    return dispatch({ type: actionTypes.SET_FILTERED_LIST_PLACES, payload });
  };
  const setSitesList = (payload: Payload<'SET_LIST_PLACES'>) => {
    return dispatch({ type: actionTypes.SET_LIST_PLACES, payload });
  };
  const setWeatherList = (payload: Payload<'SET_LIST_WEATHER'>) => {
    return dispatch({ type: actionTypes.SET_LIST_WEATHER, payload });
  };
  const setType = (payload: Payload<'SET_TYPE'>) => {
    return dispatch({ type: actionTypes.SET_TYPE, payload });
  };
  const setRating = (payload: Payload<'SET_RATING'>) => {
    return dispatch({ type: actionTypes.SET_RATING, payload });
  };
  const setSelectedPopup = (payload: Payload<'SET_POPUP_SELECTED'>) => {
    return dispatch({ type: actionTypes.SET_POPUP_SELECTED, payload });
  };

  return {
    state,
    setIsLoading,
    setInitCoords,
    setCoords,
    setBounds,
    setFilteredSitesList,
    setSitesList,
    setWeatherList,
    setType,
    setRating,
    setSelectedPopup,
  };
};
