import { useEffect, useContext, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet-geosearch/dist/providers/provider';

import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext, actionTypes } from '../../reducer/reducer';
import {
  getMapBoundsInit,
  getMapBoundsOnMoveend,
  // getMapCenterZoomOnMoveend,
} from './getMapBounds';
import PopupContent from './PopupContent';

import styles from './Map.module.css';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const attribution =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const initCenter: LatLng = { lat: 46.94618436001851, lng: -122.6065834708836 };
const initZoom = 15;

const markerIcon = new L.Icon({
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png',
  iconAnchor: [12, 41],
  // iconUrl: '/icons/leaf-green.png',
  // shadowUrl: '/icons/leaf-shadow.png',
  // iconSize: [19, 47],
  // shadowSize: [25, 32],
  // iconAnchor: [9, 47],
});

const Map: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(ListPlacesContext);

  // let map = L.map('map1');

  // L.tileLayer(url, { attribution }).addTo(map);
  // map.setView([47, -122], 10);

  const mapRef = useRef(null);

  useEffect(() => {
    let map = L.map('mymap', {
      center: initCenter,
      zoom: initZoom,
      layers: [L.tileLayer(url, { attribution })],
      // closePopupOnClick: false,
    });
    map.on('moveend', (e) => {
      getMapBoundsOnMoveend(e.target, actionTypes.SET_BOUNDS, dispatch);
      // getMapCenterZoomOnMoveend(e.target);
    });

    mapRef.current = map;

    getMapBoundsInit(mapRef, actionTypes.SET_BOUNDS, dispatch);

    return () => mapRef.current.remove();
  }, []);

  useEffect(() => {
    state.list_places?.forEach(
      ({ latitude, longitude, name, photo, rating, num_reviews }) => {
        if (latitude && longitude && name) {
          L.marker([latitude, longitude], { icon: markerIcon })
            .bindTooltip(name, {
              permanent: true,
              direction: 'right',
              className: `${styles.transparent_tooltip}`,
              offset: [0, 0],
            })
            .on('mouseover', (e) => {
              e.target.openPopup();
            })
            .bindPopup(
              `<div>${ReactDOMServer.renderToString(
                <PopupContent
                  name={name}
                  photo={photo}
                  rating={rating}
                  num_reviews={num_reviews}
                />
              )}</div>`
            )
            .addTo(mapRef.current);

          // const popup = L.popup({
          //   // closeButton: false,
          //   // closeOnClick: false,
          //   autoPan: false,
          //   maxWidth: 80,
          // })
          //   .setLatLng([latitude, longitude])
          //   .setContent(
          //     `<div>${ReactDOMServer.renderToString(
          //       <PopupContent
          //         name={name}
          //         photo={photo}
          //         rating={rating}
          //         num_reviews={num_reviews}
          //       />
          //     )}</div>`
          //   );
        }
      }
    );
  }, [state.list_places]);

  return <div id="mymap" style={{ height: '70vh' }} />;
};

export default Map;
