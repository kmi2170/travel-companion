import { useState, useEffect, useContext } from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext } from '../../reducer/reducer';
import PlaceDetails from './PlaceDetails';
// import Preview from '../Preview';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  list: {
    // margin: theme.spacing(1),
    height: '75vh',
    overflow: 'auto',
  },
}));

const ListPlaces: React.FC = () => {
  const classes = useStyles();
  const { state } = useContext(ListPlacesContext);

  // console.log('ListPlaces');

  return (
    <div>
      <Typography variant="h5" className={classes.text}>
        List of Places
      </Typography>
      <Grid container spacing={2} className={classes.list}>
        {state.list_places?.map((place, i) => (
          <Grid item key={i} xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>

      {/* 
      <Preview data={state.bounds} />
      <Preview data={state.list_restaurants} />
      */}
    </div>
  );
};

export default ListPlaces;
