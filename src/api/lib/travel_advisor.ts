import axios from 'axios';

// import { data_restaurants } from '../../assets/data_test/data_restaurants';
// import { data_attractions } from '../../assets/data_test/data_attractions_wide';
// const test = true;

const headers = {
  'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
  'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
};
const url = (type: string) =>
  `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

export const fetchLocationsByBounds = async ({
  type,
  NE_Lat,
  NE_Lng,
  SW_Lat,
  SW_Lng,
}) => {
  try {
    // if (test) {
    //   if (type === 'restaurants') return data_restaurants;
    //   if (type === 'attractions') return data_attractions;
    //   return null;
    // } else {
    const params = {
      bl_latitude: SW_Lat,
      tr_latitude: NE_Lat,
      bl_longitude: SW_Lng,
      tr_longitude: NE_Lng,
    };
    const {
      data: { data },
    } = await axios.get(url(type), {
      params,
      headers,
    });

    return data;
    // }
  } catch (error) {
    console.error(error);
  }
};
