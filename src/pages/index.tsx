import { useEffect } from 'react';
import router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { actionTypes } from '../context/actions'
import { fetchLocationsByBounds } from '../api/lib/travel_advisor';
import { fetchCurrentWeatherByBounds } from '../api/lib/open_weather';
import { ipLookup } from '../api/lib/ipLookup';

import Loading from '../components/Loading';
import Navbar from '../components/Navbar/Navbar';
import ListPlaces from '../components/ListPlaces/ListPlaces';
import Footer from '../components/Footer';
import { useCustomeCookies } from '../hooks/useCustomCookies';
import { useCustomContext } from '../context/hook';
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


interface HomeProps {
  dataListPlaces: [] | null;
  dataListWeather: {} | null;
}

const Home = ({ dataListPlaces, dataListWeather }: HomeProps) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const { state, dispatch } = useCustomContext();
  const { query } = useRouter();
  console.log('query', query)

  const { cookies, setLocationCookie } = useCustomeCookies()

  useEffect(() => {
    if (cookies.travel_location) {
      const [lat, lng] = cookies.travel_location;

      dispatch({
        type: actionTypes.SET_INIT_COORDS,
        payload: { lat, lng },
      });
    } else {
      ipLookup().then(({ lat, lng }) =>
        dispatch({
          type: actionTypes.SET_INIT_COORDS,
          payload: { lat, lng },
        })
      );
      // }
      // navigator.geolocation.getCurrentPosition(
      //   ({ coords: { latitude, longitude } }) => {
      //     console.log('geolocation');
      //     console.log(latitude, longitude);
      // );
    }
  }, []);

  useEffect(() => {
    if (state.coords.lat && state.coords.lng) {
      setLocationCookie(
        [state.coords.lat, state.coords.lng]
      );
    }
  }, [state.coords]);

  useEffect(() => {
    if (state.bounds.ne.lat && state.bounds.ne.lng) {
      router.push({
        pathname: '/',
        query: {
          type: state.type,
          neLat: state.bounds.ne.lat,
          neLng: state.bounds.ne.lng,
          swLat: state.bounds.sw.lat,
          swLng: state.bounds.sw.lng,
        },
      });
    }
  }, [state.bounds]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_IS_LOADING,
      payload: true,
    });

    if (dataListPlaces && dataListPlaces.length) {
      const dataListPlacesValidated = dataListPlaces.filter(({ name }) =>
        Boolean(name)
      );

      const filterdListPlaces = state.rating
        ? []
        : dataListPlacesValidated.filter(
          ({ rating }) => rating >= state.rating
        );

      dispatch({
        type: actionTypes.SET_LIST_PLACES,
        payload: dataListPlacesValidated as [],
      });

      dispatch({
        type: actionTypes.SET_FILTERED_LIST_PLACES,
        payload: filterdListPlaces as [] | null,
      });

      dispatch({
        type: actionTypes.SET_IS_LOADING,
        payload: false,
      });
    }
  }, [dataListPlaces]);

  useEffect(() => {
    if (
      dataListWeather &&
      dataListWeather['list'] &&
      dataListWeather['list'].length
    )
      dispatch({
        type: actionTypes.SET_LIST_WEATHER,
        payload: dataListWeather['list'],
      });
  }, [dataListWeather]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_IS_LOADING,
      payload: true,
    });

    const filterdListPlaces = state.list_places?.filter(
      ({ rating }) => rating >= state.rating
    );

    dispatch({
      type: actionTypes.SET_FILTERED_LIST_PLACES,
      payload: filterdListPlaces as [],
    });

    dispatch({
      type: actionTypes.SET_IS_LOADING,
      payload: false,
    });
  }, [state.rating]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_IS_LOADING,
      payload: true,
    });

    dispatch({
      type: actionTypes.SET_RATING,
      payload: 0,
    });

    dispatch({
      type: actionTypes.SET_POPUP_SELECTED,
      payload: { selected: null },
    });

    router.push({
      pathname: '/',
      query: { ...query, type: state.type },
    });
  }, [state.type]);


  const Map = useCustomMap()

  return (
    <div className={classes.root}>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {isDesktop ? (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.listContainer}>
                  {state.isLoading ? <Loading /> : <ListPlaces />}
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
                  {state.isLoading ? <Loading /> : <ListPlaces />}
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { type, neLat, neLng, swLat, swLng } = query;

  const dataListPlaces =
    neLat && neLng && swLat && swLng
      ? await fetchLocationsByBounds(
        type as string,
        neLat as string,
        neLng as string,
        swLat as string,
        swLng as string
      )
      : null;

  const diffLat = Math.abs(+neLat - +swLat);
  const diffLng = Math.abs(+neLng - +swLng);
  // console.log(diffLat, diffLng);

  // const dataWeather = null;
  const dataListWeather =
    neLat && neLng && swLat && swLng && diffLat < 25.0 && diffLng < 25.0
      ? await fetchCurrentWeatherByBounds(
        neLat as string,
        neLng as string,
        swLat as string,
        swLng as string
      )
      : null;

  return { props: { dataListPlaces, dataListWeather } };
};
