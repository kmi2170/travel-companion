import { useEffect, useContext, useMemo } from 'react';

import dynamic from 'next/dynamic';
import router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { useCookies } from 'react-cookie';

import {
  Container,
  Grid,
  Box,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext, actionTypes } from '../reducer/reducer';
import { fetchPlacesByBounds } from '../api/lib/travel_advisor';
import { fetchOpenWeatherCurrentByBounds } from '../api/lib/open_weather';
import { ipLookup } from '../api/lib/ipLookup';

import Loading from '../components/Loading';
import Navbar from '../components/Navbar/Navbar';
import ListPlaces from '../components/ListPlaces/ListPlaces';
import Footer from '../components/Footer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // backgroundImage:
    //   'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',
    // height: '100vh',
  },
  footerContaienr: {
    marginTop: theme.spacing(2),
  },
  mapContainer: {
    marginTop: theme.spacing(2),
  },
}));

const cookiesOptions = {
  path: '/',
  maxAge: 2600000,
  sameSite: true,
};

interface HomeProps {
  dataListPlaces: [] | null;
  dataListWeather: {} | null;
}

const Home: React.FC<HomeProps> = ({ dataListPlaces, dataListWeather }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const { state, dispatch } = useContext(ListPlacesContext);
  const { query } = useRouter();
  const [cookies, setCookie] = useCookies(['mylocation']);

  useEffect(() => {
    if (cookies.mylocation) {
      const [lat, lng] = cookies.mylocation;

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
      setCookie(
        'mylocation',
        JSON.stringify([state.coords.lat, state.coords.lng]),
        cookiesOptions
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

    router.push({
      pathname: '/',
      query: { ...query, type: state.type },
    });
  }, [state.type]);

  const displayLoading = () => <Loading />;

  const Map: any = useMemo(
    () =>
      // dynamic(() => import('../components/MapReactLeaflet/Map'), {
      dynamic(() => import('../components/MapLeaflet/Map'), {
        loading: () => displayLoading(),
        ssr: false,
      }),
    []
  );

  return (
    <div className={classes.root}>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {!matches ? (
            <>
              <Grid item xs={12} sm={6} md={8}>
                <div className={classes.mapContainer}>
                  <Map />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {state.isLoading ? <Loading /> : <ListPlaces />}
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={4}>
                {state.isLoading ? <Loading /> : <ListPlaces />}
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <div className={classes.mapContainer}>
                  <Map />
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
      ? await fetchPlacesByBounds(
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
      ? await fetchOpenWeatherCurrentByBounds(
          neLat as string,
          neLng as string,
          swLat as string,
          swLng as string
          // zoom as string
        )
      : null;

  return { props: { dataListPlaces, dataListWeather } };
};
