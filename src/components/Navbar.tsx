import { useState, useEffect, useContext } from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext } from '../reducer/reducer';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(ListPlacesContext);

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <Typography variant="h5" component="h1" className={classes.title}>
          Restaurant Finder
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
