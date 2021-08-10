import axios from 'axios';

var options = {
  method: 'GET',
  url: 'https://documenu.p.rapidapi.com/restaurants/geobbox',
  params: {
    top_left: `${ne.lat},${ne.lng}`,
    bottom_right: `${sw.lat},${sw.lng}`,
    size: '30',
    cuisine: 'Italian',
    page: '2',
    top_cuisines: 'true',
  },
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_DOCUMENU_API_KEY,
    'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
    'x-rapidapi-host': 'documenu.p.rapidapi.com',
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
