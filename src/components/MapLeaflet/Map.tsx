import { useState, useEffect, useContext, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet-geosearch/dist/providers/provider';

import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as GeoSearch from 'leaflet-geosearch';

import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext, actionTypes } from '../../reducer/reducer';
import {
  getMapBoundsInit,
  getMapBoundsOnMoveend,
  getMapCenterZoomOnMoveend,
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
const zoomWithMarkerText = 14;

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
  zoomLevel: 15,
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

const Map: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(ListPlacesContext);

  const [isMarkerText, setIsMarkerText] = useState<Boolean>(
    initZoom > zoomWithMarkerText ? true : false
  );
  // const [isTypeChanged, setIsTypeChanged] = useState<Boolean>(false);

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

    map.addControl(searchControl);

    map.on('moveend', (e) => {
      getMapBoundsOnMoveend(e, actionTypes.SET_BOUNDS, dispatch);
      getMapCenterZoomOnMoveend(e.target);
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

  // useEffect(() => {
  //   setIsTypeChanged(true);
  //   console.log('useEffect setIsTypeChanged');
  // }, [state.type]);

  useEffect(() => {
    mapRef.current.eachLayer(function (layer) {
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

          const markers = L.marker([latitude, longitude], { icon: markerIcon })
            .on('mouseover', (e) => {
              e.target.openPopup();
            })
            .bindPopup(popup);

          if (isMarkerText)
            markers.bindTooltip(name, {
              permanent: true,
              direction: 'auto',
              className: `${styles.transparent_tooltip}`,
              offset: [0, 0],
            });

          markers.addTo(mapRef.current);
        }
      }
    );

    // if (!isMarkerText) {
    //   mapRef.current.eachLayer(function (layer) {
    //     if (layer.options.pane === 'tooltipPane') {
    //       layer.removeFrom(mapRef.current);
    //       console.log('removeTooltip');
    //     }
    //   });
    // }
  }, [state.rating, state.list_places, state.filtered_list_places]);

  return <div id="mymap" style={{ height: '85vh' }} />;
};

export default Map;
