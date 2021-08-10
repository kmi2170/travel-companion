import axios from 'axios';
import { BoundsType } from '../type_settings';

const url =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
const api_key = process.env.NEXT_PUBLIC_X_RAPID_API_KEY;

export const fetchRestaurantsByBoundary = async ({ ne, sw }: BoundsType) => {
  try {
    const { data } = await axios.get(url, {
      params: {
        bl_latitude: ne.lat,
        tr_latitude: ne.lng,
        bl_longitude: sw.lat,
        tr_longitude: sw.lng,
        // limit: '30',
        // lang: 'en_US',
      },
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
        'x-rapidapi-host': api_key,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
