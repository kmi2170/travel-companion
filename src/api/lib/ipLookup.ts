import axios from 'axios';

const url = 'https://ipapi.co/json';

export const ipLookup = async () => {
  try {
    const { data } = await axios(url);

    const {
      latitude,
      longitude,
      // city,
      // region,
      // country_name,
      // country_code_iso3,
      // timezone,
      // postal,
    } = data;

    return {
      lat: latitude,
      lng: longitude,
    };
  } catch (error) {
    console.log(error);
  }
};
