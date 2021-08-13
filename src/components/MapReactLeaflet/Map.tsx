import { useContext, useRef } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// import { Typography } from '@material-ui/core';
// import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext, actionTypes } from '../../reducer/reducer';
import { GetBounds } from './MapHooks';
import ShowPopup from './ShowPopup';

// const useStyles = makeStyles((theme: Theme) => ({}));

const Map: React.FC = () => {
  // const classes = useStyles();

  const { dispatch } = useContext(ListPlacesContext);
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
        closePopupOnClick={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GetBounds />
        {/* 
        <ShowPopup />
        */}
      </MapContainer>
    </div>
  );
};

export default Map;
