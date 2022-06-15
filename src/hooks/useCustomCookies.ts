import { useCookies } from 'react-cookie';

const cookiesOptions = {
  path: '/',
  maxAge: 2600000,
  sameSite: true,
};

export const useCustomeCookies = () => {
  const [cookies, setCookie] = useCookies(['travel_location']);

  const setLocationCookie = (lat_lng) =>
    setCookie('travel_location', lat_lng, cookiesOptions);

  return { cookies, setLocationCookie };
};
