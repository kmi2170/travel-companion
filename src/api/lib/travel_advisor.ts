import axios from 'axios';

//import { data_restaurants } from '../../assets/data_restaurants_yelm';
import { data_restaurants } from '../../assets/data_restaurants_yelm_around';
import { data_attractions } from '../../assets/data_attractions_yelm_wide';

export const fetchPlacesByBoundary = async (
  type: string,
  neLat: string,
  neLng: string,
  swLat: string,
  swLng: string
) => {
  const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

  try {
    //   const {
    //     data: { data },
    //   } = await axios.get(url, {
    //     params: {
    //       bl_latitude: swLat,
    //       tr_latitude: neLat,
    //       bl_longitude: swLng,
    //       tr_longitude: neLng,
    //       // lang: 'en_US',
    //     },
    //     headers: {
    //       'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
    //       'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    //     },
    //   });

    //   return data;

    return type === 'restaurants'
      ? data_restaurants
      : type === 'attractions'
      ? data_attractions
      : null;
  } catch (error) {
    console.log(error);
  }
};
