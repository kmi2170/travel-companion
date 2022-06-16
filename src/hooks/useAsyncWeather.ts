import { useCallback, useEffect } from 'react';
import axios from 'axios';

import { useTravelDispatchContext } from '../contexts/travel/hooks';
import { useMapStateContext } from '../contexts/map/hooks';
import { BoundsAPI } from '../api/type_settings';

export const useAsyncWeather = () => {
  const { setTravelIsLoading, setTravelWeather } = useTravelDispatchContext();
  const { bounds } = useMapStateContext();

  const NE_Lat = bounds?.ne?.lat;
  const NE_Lng = bounds?.ne?.lng;
  const SW_Lat = bounds?.sw?.lat;
  const SW_Lng = bounds?.sw?.lng;

  const diff_Lat = Math.abs(+NE_Lat - +SW_Lat);
  const diff_Lng = Math.abs(+NE_Lng - +SW_Lng);

  const fetchTravelWeather = useCallback(
    ({ NE_Lat, NE_Lng, SW_Lat, SW_Lng }: Omit<BoundsAPI, 'type'>) => {
      try {
        setTravelIsLoading(true);

        (async () => {
          const params = { NE_Lat, NE_Lng, SW_Lat, SW_Lng };
          const { data } = await axios('/api/weather', { params });
          setTravelWeather(data['list']);
        })();
      } catch (error) {
        console.error(error);
      } finally {
        setTravelIsLoading(false);
      }
    },
    [bounds]
  );

  useEffect(() => {
    if (
      NE_Lat &&
      NE_Lng &&
      SW_Lat &&
      SW_Lng &&
      diff_Lat < 25.0 &&
      diff_Lng < 25.0
    ) {
      fetchTravelWeather({ NE_Lat, NE_Lng, SW_Lat, SW_Lng });
    }
  }, [bounds]);
};
