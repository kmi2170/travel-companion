import { useState, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet-geosearch/dist/providers/provider';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as GeoSearch from 'leaflet-geosearch';

import { actionTypes } from '../../context/actions'
import {
  getMapBoundsInit,
  getMapBoundsOnMoveend,
  getMapCenterZoomOnMoveend,
} from '../../utils/map'
import PopupContent from './PopupContent';
import PopupWeather from './PopupWeather';

import styles from './Map.module.css';
import { useCustomContext } from '../../context/hook';

const attribution =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// const initCenter: LatLng = { lat: 46.94618436001851, lng: -122.6065834708836 }; //Yelm
const initCenter: LatLng = { lat: 40.69729900863675, lng: -73.97918701171876 }; // New York
const initZoom = 12;
const zoomWithMarkerText = 15;

const markerIcon = new L.Icon({
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png',
  iconSize: [20, 33],
  shadowSize: [33, 33],
  iconAnchor: [10, 33],
  // iconUrl: '/icons/leaf-green.png',
  // shadowUrl: '/icons/leaf-shadow.png',
  // iconSize: [19, 47],
  // shadowSize: [25, 32],
  // iconAnchor: [9, 47],
});

// @ts-ignore
const searchControl = new GeoSearch.GeoSearchControl({
  provider: new OpenStreetMapProvider(),
  style: 'bar',
  retainZoomLevel: true,
  marker: {
    position: 'topright',
    icon: markerIcon,
    draggable: false,
  },
});

const content = (
  index: number,
  name: string,
  photo: any,
  rating: string,
  num_reviews: string
) =>
  `<div>${ReactDOMServer.renderToString(
    <PopupContent
      index={index}
      name={name}
      photo={photo}
      rating={rating}
      num_reviews={num_reviews}
    />
  )}</div>`;

const contentWeather = (description: string, temp: number) =>
  `<div>${ReactDOMServer.renderToString(
    <PopupWeather description={description} temp={temp} />
  )}</div>`;

const Map = () => {
  const { state, dispatch } = useCustomContext()

  console.log(state)
  const [isMarkerText, setIsMarkerText] = useState<Boolean>(
    initZoom > zoomWithMarkerText ? true : false
  );

  const mapRef = useRef(null);

  // console.log('Map init_coords', state.init_coords);
  useEffect(() => {
    let map = L.map('mymap', {
      center:
        state.init_coords.lat && state.init_coords.lng
          ? state.init_coords
          : initCenter,
      zoom: initZoom,
      scrollWheelZoom: false,
      layers: [L.tileLayer(url, { attribution })],
      // closePopupOnClick: false,
    });

    map.addControl(searchControl);

    map.on('moveend', (e) => {
      getMapBoundsOnMoveend(e, actionTypes.SET_BOUNDS, dispatch);
      getMapCenterZoomOnMoveend(e.target, actionTypes.SET_COORDS, dispatch);
    });

    map.on('zoom', (e) => {
      const zoom = e.target.getZoom();
      setIsMarkerText(zoom > zoomWithMarkerText);
    });

    mapRef.current = map;

    getMapBoundsInit(mapRef, actionTypes.SET_BOUNDS, dispatch);

    return () => {
      map.removeControl(searchControl);
      map.remove();
    };
  }, []);

  useEffect(() => {
    mapRef.current.eachLayer(function(layer) {
      if (layer.options.pane === 'markerPane') {
        layer.removeFrom(mapRef.current);
        console.log('removeMarker');
      }
    });

    const list = state.filtered_list_places?.length
      ? state.filtered_list_places
      : state.list_places;

    list?.forEach(
      ({ latitude, longitude, name, photo, rating, num_reviews }, i) => {
        if (latitude && longitude && name) {
          const popup = L.popup({
            maxWidth: 150,
            autoPan: true,
            // keepInView: true,
            // closeButton: false,
            // closeOnClick: false,
          })
            .setLatLng([latitude, longitude])
            .setContent(content(i, name, photo, rating, num_reviews));

          document.addEventListener('click', (e: MouseEvent) => {
            if ((e.target as HTMLElement).id === `pContent${i}`) {
              console.log('click', i);
              dispatch({
                type: actionTypes.SET_POPUP_SELECTED,
                payload: { selected: i },
              });
            }
          });

          const marker = L.marker([latitude, longitude], { icon: markerIcon })
            .on('mouseover', (e) => {
              e.target.openPopup();
            })
            .bindPopup(popup);

          if (isMarkerText)
            marker.bindTooltip(name, {
              permanent: true,
              direction: 'auto',
              className: `${styles.transparent_tooltip}`,
              offset: [0, 0],
            });

          marker.addTo(mapRef.current);
        }
      }
    );

    if (state.list_weather?.length) {
      state.list_weather.map(
        ({ coord: { Lat, Lon }, weather, main: { temp } }) => {
          const popupWeather = L.popup({
            maxWidth: 150,
            // autoPan: true,
            // keepInView: true,
            // closeButton: false,
            // closeOnClick: false,
          })
            .setLatLng([Lat, Lon])
            .setContent(contentWeather(weather[0]['description'], temp));

          const weatherIcon = new L.Icon({
            iconUrl: ` http://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`,
            iconSize: [50, 50],
          });
          const weatherMarker = L.marker([Lat, Lon], { icon: weatherIcon })
            .on('mouseover', (e) => {
              e.target.openPopup();
            })
            .bindPopup(popupWeather);

          weatherMarker.addTo(mapRef.current);
        }
      );
    }
  }, [state.rating, state.list_places, state.filtered_list_places]);

  return <div id="mymap" style={{ height: '85vh' }} />;
};

export default Map;
