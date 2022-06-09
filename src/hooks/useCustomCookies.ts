import { useCookies } from 'react-cookie';

const cookiesOptions = {
  path: '/',
  maxAge: 2600000,
  sameSite: true,
};

export const useCustomeCookies = () => {
  const [cookies, setCookie] = useCookies(['travel_location']);

  const setLocationCookie = location =>
    setCookie('travel_location', location, cookiesOptions);

  return { cookies, setLocationCookie };
};
