import { useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ipLookup } from '../api/lib/ipLookup';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ListSites from '../components/ListSites';
import Footer from '../components/Footer';
import { useCustomeCookies } from '../hooks/useCustomCookies';
import { useTravelContext, useTravelDispatchContext } from '../context/hooks';
import { useCustomMap } from '../hooks/useCustomMap';

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

  const {
    list_sites,
    coords,
    bounds,
    type,
    rating,
    isLoading,
  } = useTravelContext();
  const {
    setInitCoords,
    setRating,
    setFilteredSites,
    setSelectedPopup,
    fetchSites,
    fetchWeather
  } = useTravelDispatchContext();
  const { cookies, setLocationCookie } = useCustomeCookies();

  const Map = useCustomMap();

  useEffect(() => {
    if (cookies.travel_location) {
      const [lat, lng] = cookies.travel_location
      if (!isNaN(lat) && !isNaN(lng)) {
        setInitCoords({ lat, lng });
        return
      }
    }

    ipLookup().then(({ lat, lng }) => {
      if (!isNaN(lat) && !isNaN(lng)) setInitCoords({ lat: +lat, lng: +lng })
    });
  }, []);

  useEffect(() => {
    if (coords.lat && coords.lng) {
      setLocationCookie([coords.lat, coords.lng])
    }
  }, [coords]);

  const NE_Lat = bounds?.ne?.lat
  const NE_Lng = bounds?.ne?.lng
  const SW_Lat = bounds?.sw?.lat
  const SW_Lng = bounds?.sw?.lng

  useEffect(() => {
    if (NE_Lat && NE_Lng && SW_Lat && SW_Lng) {
      fetchSites({ type, NE_Lat, NE_Lng, SW_Lat, SW_Lng }, rating)
    }
  }, [bounds, type]);

  useEffect(() => {
    const diff_Lat = Math.abs(+NE_Lat - +SW_Lat);
    const diff_Lng = Math.abs(+NE_Lng - +SW_Lng);
    if (NE_Lat && NE_Lng && SW_Lat && SW_Lng && diff_Lat < 25.0 && diff_Lng < 25.0) {
      fetchWeather({ NE_Lat, NE_Lng, SW_Lat, SW_Lng })
    }
  }, [bounds]);

  useEffect(() => {
    const filteredData = list_sites?.filter(
      ({ rating: value }) => value >= rating
    ) as []
    setFilteredSites(filteredData);
  }, [rating]);

  useEffect(() => {
    setRating(0)
    setSelectedPopup({ selected: null });
  }, [type]);

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
