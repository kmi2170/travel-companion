import { useContext, useReducer } from 'react';
import axios from 'axios';
import {
  TravelContext,
  TravelDispatchContext,
  TravelDispatchContextType,
} from './index';
import { initialState, State } from './state';
import { reducer } from './reducer';
import { actionTypes, ActionType } from './actions';
import { BoundsAPI } from '../api/type_settings';

export const useTravelStateContext = () => {
  return useContext<State>(TravelContext);
};

export const useTravelDispatchContext = () => {
  return useContext<TravelDispatchContextType>(TravelDispatchContext);
};

type Payload<T> = Extract<ActionType, { type: T }>['payload'];

export const useTravelContext = () => {
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
  const setFilteredSites = (
    payload: Payload<'SET_FILTERED_LIST_SITES'>
  ) => {
    return dispatch({ type: actionTypes.SET_FILTERED_LIST_SITES, payload });
  };
  const setSites = (payload: Payload<'SET_LIST_SITES'>) => {
    return dispatch({ type: actionTypes.SET_LIST_SITES, payload });
  };
  const setWeather = (payload: Payload<'SET_LIST_WEATHER'>) => {
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

  const fetchSites = (
    { type, NE_Lat, NE_Lng, SW_Lat, SW_Lng }: BoundsAPI, rating: Payload<'SET_RATING'>
  ) => {
    try {
      setIsLoading(true);
      (async () => {
        const params = { type, NE_Lat, NE_Lng, SW_Lat, SW_Lng };
        const { data } = await axios('/api/locations', { params });
        const filteredData = data?.filter(({ name }) => Boolean(name))
          .filter(({ rating: value }) => value >= rating);
        setSites(data);
        setFilteredSites(filteredData);
      })();
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  const fetchWeather = async ({ NE_Lat, NE_Lng, SW_Lat, SW_Lng }: Omit<BoundsAPI, 'type'>) => {
    try {
      setIsLoading(true);
      (async () => {
        const params = { NE_Lat, NE_Lng, SW_Lat, SW_Lng };
        const { data } = await axios('/api/weather', { params });
        setWeather(data['list'])
      })();
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  return {
    state,
    setIsLoading,
    setInitCoords,
    setCoords,
    setBounds,
    setFilteredSites,
    setSites,
    setWeather,
    setType,
    setRating,
    setSelectedPopup,
    fetchSites,
    fetchWeather
  };
};
