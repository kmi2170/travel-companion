import { useState, useEffect, useContext } from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListRestaurantsContext } from '../reducer/reducer';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const Component: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(ListRestaurantsContext);

  return (
    <div>
      <Typography variant="h5" className={classes.text}>
        component
      </Typography>
    </div>
  );
};

export default Component;
