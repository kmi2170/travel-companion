import { useState, useEffect, useContext } from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext } from '../../reducer/reducer';
import Form from './Form';

const useStyles = makeStyles((theme: Theme) => ({
  toolBar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
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
      <Toolbar variant="dense" className={classes.toolBar}>
        <Typography variant="h5" component="h1" className={classes.title}>
          Restaurant Finder
        </Typography>
        <Form />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;