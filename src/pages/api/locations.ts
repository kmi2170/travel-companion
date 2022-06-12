import { NextApiRequest, NextApiResponse } from 'next';

import { fetchLocationsByBounds } from '../../api/lib/travel_advisor';
import { BoundsAPI } from '../../api/type_settings';

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { type, NE_Lat, NE_Lng, SW_Lat, SW_Lng } = req.query;

    const data = await fetchLocationsByBounds({
      type,
      NE_Lat,
      NE_Lng,
      SW_Lat,
      SW_Lng,
    } as BoundsAPI);
    console.log('pages/api');
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.response.status).json(error);
  }
}
