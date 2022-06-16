import { useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ListSites from '../components/ListSites';
import Footer from '../components/Footer';
import { useTravelStateContext } from '../contexts/travel/hooks';
import { useCustomMap } from '../hooks/useCustomMap';
import { useAsyncWeather } from '../hooks/useAsyncWeather';
import { useAsyncTravel } from '../hooks/useAsyncTravel';
import { useSetMapInitCoords } from '../hooks/useSetMapInitCoords';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // backgroundImage:
    //   'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',
    // height: '100vh',
  },
  footerContaienr: {
    marginTop: theme.spacing(1),
  },
  mapContainer: {
    marginTop: theme.spacing(2),
  },
  listContainer: {
    marginTop: theme.spacing(3),
  },
  floatButtonContainer: {
    // display: 'flex',
    // justifyContent: 'center',
    // marginTop: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const Map = useCustomMap();

  useSetMapInitCoords();

  const { isLoading } = useAsyncTravel();

  useAsyncWeather();

  return (
    <div className={classes.root}>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {isDesktop ? (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.listContainer}>
                  {isLoading ? <Loading /> : <ListSites />}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <div className={classes.mapContainer}>
                  <Map />
                </div>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={8}>
                <div className={classes.mapContainer}>
                  <Map />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.listContainer}>
                  {isLoading ? <Loading /> : <ListSites />}
                </div>
              </Grid>
            </>
          )}
        </Grid>
        <div className={classes.footerContaienr}>
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default Home;
