import { useCallback, useEffect } from 'react';
import axios from 'axios';

import {
  useTravelStateContext,
  useTravelDispatchContext,
} from '../contexts/travel/hooks';
import { useMapStateContext } from '../contexts/map/hooks';
import { BoundsAPI } from '../api/type_settings';

export const useAsyncTravel = () => {
  const { setTravelIsLoading, setTravelSites, setTravelFilteredSites } =
    useTravelDispatchContext();
  const { isLoading, type, rating } = useTravelStateContext();
  const { bounds } = useMapStateContext();

  const NE_Lat = bounds?.ne?.lat;
  const NE_Lng = bounds?.ne?.lng;
  const SW_Lat = bounds?.sw?.lat;
  const SW_Lng = bounds?.sw?.lng;

  const fetchTravelSites = useCallback(
    ({ type, NE_Lat, NE_Lng, SW_Lat, SW_Lng }: BoundsAPI, rating: number) => {
      try {
        setTravelIsLoading(true);
        (async () => {
          const params = { type, NE_Lat, NE_Lng, SW_Lat, SW_Lng };
          const { data } = await axios('/api/locations', { params });
          const filteredData = data
            .filter(({ name }) => Boolean(name))
            .filter(({ rating: value }) => value >= rating);
          setTravelSites(data);
          setTravelFilteredSites(filteredData);
        })();
      } catch (error) {
        console.error(error);
      } finally {
        setTravelIsLoading(false);
      }
    },
    [bounds, type]
  );

  useEffect(() => {
    if (NE_Lat && NE_Lng && SW_Lat && SW_Lng) {
      fetchTravelSites({ type, NE_Lat, NE_Lng, SW_Lat, SW_Lng }, rating);
    }
  }, [bounds, type]);

  return { isLoading };
};
