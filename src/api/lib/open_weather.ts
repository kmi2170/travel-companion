import axios from 'axios';

const api_key = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;
const url = 'https://api.openweathermap.org/data/2.5/box/city';
const zoom = 15

export const fetchCurrentWeatherByBounds = async (
  NE_Lat: string,
  NE_Lng: string,
  SW_Lat: string,
  SW_Lng: string
) => {
  try {
    const { data } = await axios.get(url, {
      params: {
        bbox: `${NE_Lng},${SW_Lat},${SW_Lng},${NE_Lat},${zoom}`,
        //{lon - left, lat - bottom, lon - right, lat - top, zoom}
        units: 'imperial',
        appid: api_key,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
