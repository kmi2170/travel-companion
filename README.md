# Travel Companion
An app to find hotls, restaurants and attractions near where you are and anywhere in the world.

## Features and Functions
- Spots: hotels, restaurants and attractons in the area shown on the map. 
- By default, a location on the map is identified by your IP address. Also, can search any location you are intrested in,  by location name, or address.  
- Some more details information is shown in the list on the left panel.
- Spots are shown by markers on the map, By hovering a cursor over it triggers a popup that shows the minmum information. 
- By clinking the datails in popups, the list on the left scrolls to the corresponding place.
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
