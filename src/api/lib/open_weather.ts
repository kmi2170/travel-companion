import axios from 'axios';

const api_key = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export const fetchOpenWeatherCurrentByBounds = async (
  neLat: string,
  neLng: string,
  swLat: string,
  swLng: string
  // zoom: string
) => {
  const url = 'https://api.openweathermap.org/data/2.5/box/city';
  //(lon - left, lat - bottom, lon - right, lat - top, zoom)

  try {
    const { data } = await axios.get(url, {
      params: {
        bbox: `${neLng},${swLat},${swLng},${neLat},10`,
        //bbox: `${neLng},${swLat},${swLng},${neLat},${zoom}`,
        appid: api_key,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
