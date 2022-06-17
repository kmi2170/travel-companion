import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { Coords } from '../api/type_settings';
import {
  useMapStateContext,
  useMapDispatchContext,
} from '../contexts/map/hooks';
import { ipLookup } from '../api/lib/ipLookup';

const cookiesOptions = {
  path: '/',
  maxAge: 2600000,
  sameSite: true,
};

export const useMapCookie = () => {
  const [cookies, setCookie] = useCookies(['travel_location']);

  const { coords } = useMapStateContext();
  const { setMapInitCoords } = useMapDispatchContext();

  const setLocationCookie = ({ lat, lng }: Coords) => {
    if (lat && lng) {
      setCookie('travel_location', [lat, lng], cookiesOptions);
    }
  };

  useEffect(() => {
    if (cookies.travel_location) {
      const [lat, lng] = cookies.travel_location;
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapInitCoords({ lat, lng });
        return;
      }
    }

    ipLookup().then(({ lat, lng }) => {
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapInitCoords({ lat, lng });
        setLocationCookie({ lat, lng });
      }
    });
  }, []);

  useEffect(() => {
    setLocationCookie(coords);
  }, [coords]);
};
