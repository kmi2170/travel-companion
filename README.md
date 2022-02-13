# Travel Companion
An app to search hotels, restaurants, and attractions around the world.

## Features and Functions
- Search hotels, restaurants, and attractions in the area shown on the map. 
- The places found are shown by markers on the map, By hovering a cursor over it triggers a popup that shows some information of the place. 
- More details information is listed on the left panel.
- By clinking the datails in popups, the list on the left scrolls to the corresponding place.
- By default, a location on the map is determined by your IP address. Also, can search any location you are intrested in around the world,   by location name, or address.  
- Narrow down the list by ratings.
- Additional infomation: weather icon are showed on the map.

## Technicals

This project is built with 
- [Next.js](https://nextjs.org/)
- TypeScript 
- [Leaflet.js](https://react-leaflet.js.org/) (for map)
- [Material-UI](https://mui.com/).

### API Calls
- [Travel Advisor](https://rapidapi.com/apidojo/api/travel-advisor/) (An app-key required. Freemium.)
- [OpenWeather API](https://openweathermap.org/api) (for weather icons, an app-key required. There is a free plan.)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
