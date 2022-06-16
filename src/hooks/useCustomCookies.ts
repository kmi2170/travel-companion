import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Coords } from '../api/type_settings';

const cookiesOptions = {
  path: '/',
  maxAge: 2600000,
  sameSite: true,
};

export const useCustomeCookies = (coords: Coords) => {
  const [cookies, setCookie] = useCookies(['travel_location']);

  const setLocationCookie = ({ lat, lng }: Coords) => {
    if (lat && lng) {
      setCookie('travel_location', [lat, lng], cookiesOptions);
      console.log('setcookie')
    }
  }

  useEffect(() => {
    setLocationCookie(coords)
  }, [coords]);

  return { cookies };
};
