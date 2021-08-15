import axios from 'axios';

//import { data_restaurants } from '../../assets/data_restaurants_yelm';
import { data_restaurants } from '../../assets/data_restaurants_yelm_around';

const url =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const fetchRestaurantsByBoundary = async (
  neLat: string,
  neLng: string,
  swLat: string,
  swLng: string
) => {
  try {
    // const {
    //   data: { data },
    // } = await axios.get(url, {
    //   params: {
    //     bl_latitude: swLat,
    //     tr_latitude: neLat,
    //     bl_longitude: swLng,
    //     tr_longitude: neLng,
    //     limit: '100',
    //     // lang: 'en_US',
    //   },
    //   headers: {
    //     'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
    //     'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    //   },
    // });
    // return data;

    return data_restaurants;
  } catch (error) {
    console.log(error);
  }
};
