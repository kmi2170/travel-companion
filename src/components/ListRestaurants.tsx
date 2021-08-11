import { useState, useEffect, useContext } from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListRestaurantsContext } from '../reducer/reducer';
import Preview from './Preview';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const ListRestaurants: React.FC = () => {
  const classes = useStyles();
  const { state } = useContext(ListRestaurantsContext);

  console.log('ListRestaurants');

  return (
    <div>
      <Typography variant="h5" className={classes.text}>
        List Restaurants
      </Typography>
      <Preview data={state.bounds} />
      <Preview data={state.list_restaurants} />
    </div>
  );
};

export default ListRestaurants;
