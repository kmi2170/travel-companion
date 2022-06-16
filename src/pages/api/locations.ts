import { NextApiRequest, NextApiResponse } from 'next';

import { fetchLocationsByBounds } from '../../api/lib/travel_advisor';

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { type, NE_Lat, NE_Lng, SW_Lat, SW_Lng } = req.query;

    const data = await fetchLocationsByBounds({
      type,
      NE_Lat,
      NE_Lng,
      SW_Lat,
      SW_Lng,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.response.status).json(error);
  }
}
