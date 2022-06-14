import { useContext, useReducer } from 'react';
import {
  TravelContext,
  TravelDispatchContext,
  TravelDispatchContextType,
} from './index';
import { initialState, State } from './state';
import { reducer } from './reducer';
import { actionTypes } from './actions';
import { Coords, Bounds } from '../api/type_settings';

export const useTravelContext = () => {
  return useContext<State>(TravelContext);
};

export const useTravelDispatchContext = () => {
  return useContext<TravelDispatchContextType>(TravelDispatchContext);
};

export const useTravelForContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIsLoading = (isLoading: boolean) => {
    return dispatch({
      type: actionTypes.SET_IS_LOADING,
      payload: isLoading,
    });
  };
  const setInitCoords = (lat_lng: Coords) => {
    return dispatch({
      type: actionTypes.SET_INIT_COORDS,
      payload: lat_lng,
    });
  };
  const setCoords = (lat_lng: Coords) => {
    return dispatch({
      type: actionTypes.SET_COORDS,
      payload: lat_lng,
    });
  };
  const setBounds = (bounds: Bounds) => {
    return dispatch({
      type: actionTypes.SET_BOUNDS,
      payload: bounds,
    });
  };
  const setFilteredSites = (sites: [] | null) => {
    return dispatch({
      type: actionTypes.SET_FILTERED_LIST_PLACES,
      payload: sites,
    });
  };
  const setType = (type: string) => {
    return dispatch({
      type: actionTypes.SET_TYPE,
      payload: type,
    });
  };
  const setRating = (rating: number) => {
    return dispatch({
      type: actionTypes.SET_RATING,
      payload: rating,
    });
  };
  const setSelectedPopup = (selected: number) => {
    return dispatch({
      type: actionTypes.SET_POPUP_SELECTED,
      payload: { selected },
    });
  };

  return {
    state,
    setIsLoading,
    setInitCoords,
    setCoords,
    setBounds,
    setFilteredSites,
    setType,
    setRating,
    setSelectedPopup,
  };
};
