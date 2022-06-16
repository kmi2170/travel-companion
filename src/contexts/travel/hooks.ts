import { useContext, useReducer } from 'react';
import { StateContext, DispatchContext, DispatchContextType } from './index';
import { initialState, State } from './state';
import { reducer } from './reducer';
import { actionTypes, ActionType } from './actions';

export const useTravelStateContext = () => {
  return useContext<State>(StateContext);
};

export const useTravelDispatchContext = () => {
  return useContext<DispatchContextType>(DispatchContext);
};

type Payload<T> = Extract<ActionType, { type: T }>['payload'];

export const useTravelContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTravelIsLoading = (payload: Payload<'SET_IS_LOADING'>) => {
    return dispatch({ type: actionTypes.SET_IS_LOADING, payload });
  };
  const setTravelFilteredSites = (
    payload: Payload<'SET_FILTERED_LIST_SITES'>
  ) => {
    return dispatch({ type: actionTypes.SET_FILTERED_LIST_SITES, payload });
  };
  const setTravelSites = (payload: Payload<'SET_LIST_SITES'>) => {
    return dispatch({ type: actionTypes.SET_LIST_SITES, payload });
  };
  const setTravelWeather = (payload: Payload<'SET_LIST_WEATHER'>) => {
    return dispatch({ type: actionTypes.SET_LIST_WEATHER, payload });
  };
  const setTravelType = (payload: Payload<'SET_TYPE'>) => {
    return dispatch({ type: actionTypes.SET_TYPE, payload });
  };
  const setTravelRating = (payload: Payload<'SET_RATING'>) => {
    return dispatch({ type: actionTypes.SET_RATING, payload });
  };

  return {
    state,
    setTravelIsLoading,
    setTravelFilteredSites,
    setTravelSites,
    setTravelWeather,
    setTravelType,
    setTravelRating,
  };
};
