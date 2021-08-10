import { useState, useEffect } from 'react';

import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { GetBounds } from './MapLeafletHooks';

const useStyles = makeStyles((theme: Theme) => ({
  // map: {
  //   width: '100%',
  //   height: '100%',
  // },
  // leaflet: {
  //   width: '100%',
  //   height: '100%',
  // },
}));

const MapLeaflet: React.FC = () => {
  const classes = useStyles();

  console.log('MapLeaflet');

  const moveHandler = (event: any) => {
    const center = event.target.getCenter();
    const zoom = event.target.getZoom();
    const bounds = event.target.getBounds();
    console.log(center, zoom);
    console.log(bounds);
  };

  return (
    <div>
      <MapContainer
        // className={classes.map}
        style={{ height: '80vh', width: '100%' }}
        // ref={mapRef}
        // whenCreated={(mapInstance) => {
        //   mapRef.current = mapInstance;
        // }}
        center={[47, -122]}
        zoom={8}
        scrollWheelZoom={false}
        onMove={moveHandler}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GetBounds />
      </MapContainer>
    </div>
  );
};

export default MapLeaflet;
