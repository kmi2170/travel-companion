import axios from 'axios';
import { BoundsAPI } from '../type_settings';

const api_key = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;
const url = 'https://api.openweathermap.org/data/2.5/box/city';
const zoom = 15;

export const fetchCurrentWeatherByBounds = async ({
  NE_Lat,
  NE_Lng,
  SW_Lat,
  SW_Lng,
}: Omit<BoundsAPI, 'type'>) => {
  try {
    const { data } = await axios.get(url, {
      params: {
        //{lng - left, lat - bottom, lng - right, lat - top, zoom}
        bbox: `${NE_Lng},${SW_Lat},${SW_Lng},${NE_Lat},${zoom}`,
        units: 'imperial',
        appid: api_key,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
