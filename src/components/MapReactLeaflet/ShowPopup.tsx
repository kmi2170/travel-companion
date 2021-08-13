import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

import { Popup, Tooltip, Marker } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import L from 'leaflet';

import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import { ListPlacesContext } from '../../reducer/reducer';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const map = L.map('map', {
  center: [47, -122],
  zoom: 13,
});

// const popup = L.popup()
//   .setLatLng([47, -122])
//   .setContent('<p>popup test</p>')
//   .openOn();

const ShowPopup: React.FC = () => {
  const classes = useStyles();
  const { state } = useContext(ListPlacesContext);

  return (
    <>
      {/* 
      {state?.list_places?.map((place, i) => console.log(place.name))}
      {state?.list_places?.map((place, i) => (
        <Marker key={i} position={[place.latitude, place.langitude]}>
          <Popup>
            <Typography variant="h5" className={classes.text}>
              Place
            </Typography>
          </Popup>
        </Marker>
      ))}
      <Popup ref={(ref) => console.log(ref)}>
      <Marker position={[47, -122]} ref={(ref) => ref?.openPopup()}>
        <Popup>
          <Typography variant="h5" className={classes.text}>
            Place
          </Typography>
        </Popup>
      </Marker>
        <Marker key={i} position={[47, -122]}>
          <Tooltip permanent>
            <Typography variant="h5" className={classes.text}>
              {name}
            </Typography>
          </Tooltip>
        </Marker>
      {state.list_places?.map(
        ({ name, latitude, longitude, photo, rating }, i) =>
          latitude &&
          longitude && (
            <Marker key={i} position={[latitude, longitude]}>
              <Tooltip permanent>
                <Typography variant="h6" className={classes.text}>
                  {name}
                </Typography>
                {photo && photo.images.thumbnail.url}
                <Image
                  src={
                    photo
                      ? photo.images.large.url
                      : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  }
                  height={20}
                  width={20}
                  alt={name}
                />
                <Rating name="read-only" value={+rating} readOnly />
              </Tooltip>
            </Marker>
          )
      )}
            */}
    </>
  );
};

export default ShowPopup;
