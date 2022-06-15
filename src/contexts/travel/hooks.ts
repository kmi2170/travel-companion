import { useContext, useReducer } from 'react';
import axios from 'axios';
import {
  StateContext,
  DispatchContext,
  DispatchContextType,
} from './index';
import { initialState, State } from './state';
import { reducer } from './reducer';
import { actionTypes, ActionType } from './actions';
import { BoundsAPI } from '../../api/type_settings';

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

  const fetchTravelSites = (
    { type, NE_Lat, NE_Lng, SW_Lat, SW_Lng }: BoundsAPI, rating: Payload<'SET_RATING'>
  ) => {
    try {
      setTravelIsLoading(true);
      (async () => {
        const params = { type, NE_Lat, NE_Lng, SW_Lat, SW_Lng };
        const { data } = await axios('/api/locations', { params });
        const filteredData = data?.filter(({ name }) => Boolean(name))
          .filter(({ rating: value }) => value >= rating);
        setTravelSites(data);
        setTravelFilteredSites(filteredData);
      })();
    } catch (error) {
      console.error(error)
    } finally {
      setTravelIsLoading(false);
    }
  }

  const fetchTravelWeather = async ({ NE_Lat, NE_Lng, SW_Lat, SW_Lng }: Omit<BoundsAPI, 'type'>) => {
    try {
      setTravelIsLoading(true);
      (async () => {
        const params = { NE_Lat, NE_Lng, SW_Lat, SW_Lng };
        const { data } = await axios('/api/weather', { params });
        setTravelWeather(data['list'])
      })();
    } catch (error) {
      console.error(error)
    } finally {
      setTravelIsLoading(false);
    }
  }

  return {
    state,
    setTravelIsLoading,
    setTravelFilteredSites,
    setTravelSites,
    setTravelWeather,
    setTravelType,
    setTravelRating,
    fetchTravelSites,
    fetchTravelWeather
  };
};
