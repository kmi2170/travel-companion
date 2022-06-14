import { NextApiRequest, NextApiResponse } from 'next';

import { fetchCurrentWeatherByBounds } from '../../api/lib/open_weather';
import { BoundsAPI } from '../../api/type_settings';

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { NE_Lat, NE_Lng, SW_Lat, SW_Lng } = req.query;

    const data = await fetchCurrentWeatherByBounds({
      NE_Lat,
      NE_Lng,
      SW_Lat,
      SW_Lng,
    } as BoundsAPI);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.response.status).json(error);
  }
}
