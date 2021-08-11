import axios from 'axios';

const URL =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlaceDate = async (neLat, neLng, swLat, swLng) => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: swLat,
        tr_latitude: neLat,
        bl_longitude: swLng,
        tr_longitude: neLng,
      },
      headers: {
        'x-rapidapi-key': 'e55c60efe5msh73070d6e421d34bp11cc43jsn5f182a073484',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
