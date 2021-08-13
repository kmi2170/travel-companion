import { useState, useEffect, useContext, useRef } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet-geosearch/dist/providers/provider';

import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext, actionTypes } from '../../reducer/reducer';
import {
  getMapBoundsInit,
  getMapBoundsOnMoveend,
  getMapCenterZoomOnMoveend,
} from './getMapBounds';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const attribution =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const initCenter: LatLng = { lat: 46.94618436001851, lng: -122.6065834708836 };
const initZoom = 13;

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
    });

    map.on('moveend', (e) => {
      getMapBoundsOnMoveend(e.target, actionTypes.SET_BOUNDS, dispatch);
      // getMapCenterZoomOnMoveend(e.target);
    });

    mapRef.current = map;

    getMapBoundsInit(mapRef, actionTypes.SET_BOUNDS, dispatch);

    return () => mapRef.current.remove();
  }, []);

  return <div id="mymap" style={{ height: '70vh' }} />;
};

export default Map;
