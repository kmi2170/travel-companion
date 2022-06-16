import { useEffect } from 'react';

import {
  useMapStateContext,
  useMapDispatchContext,
} from '../contexts/map/hooks';
import { useCustomeCookies } from './useCustomCookies';
import { ipLookup } from '../api/lib/ipLookup';

export const useSetMapInitCoords = () => {
  const { coords } = useMapStateContext();
  const { setMapInitCoords } = useMapDispatchContext();

  const { cookies } = useCustomeCookies(coords);

  useEffect(() => {
    if (cookies.travel_location) {
      const [lat, lng] = cookies.travel_location;
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapInitCoords({ lat, lng });
        return;
      }
    }

    ipLookup().then(({ lat, lng }) => {
      if (!isNaN(lat) && !isNaN(lng))
        setMapInitCoords({ lat: +lat, lng: +lng });
    });
  }, []);
};
