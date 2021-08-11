import { useContext, useRef } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// import { Typography } from '@material-ui/core';
// import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListRestaurantsContext, actionTypes } from '../../reducer/reducer';
import { GetBounds } from './MapLeafletHooks';

// const useStyles = makeStyles((theme: Theme) => ({}));

const MapLeaflet: React.FC = () => {
  // const classes = useStyles();

  const { dispatch } = useContext(ListRestaurantsContext);
  const mapRef = useRef(null);

  const handlewhenCreated = (mapInstance: any) => {
    mapRef.current = mapInstance;
    const ne = mapRef.current.getBounds().getNorthEast();
    const sw = mapRef.current.getBounds().getSouthWest();
    // console.log(mapRef.current.getBounds());

    dispatch({
      type: actionTypes.SET_BOUNDS,
      payload: { ne, sw },
    });
  };

  console.log('MapLeaflet');

  return (
    <div>
      <MapContainer
        style={{ height: '80vh', width: '100%' }}
        center={[47, -122]}
        zoom={9}
        scrollWheelZoom={false}
        whenCreated={(mapInstance) => handlewhenCreated(mapInstance)}
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
