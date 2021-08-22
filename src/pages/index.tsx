import { useEffect, useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import axios from 'axios';
import {
  Container,
  Grid,
  Box,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext, actionTypes } from '../reducer/reducer';
import { fetchPlacesByBoundary } from '../api/lib/travel_advisor';

import SEO from '../components/SEO';
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
    background: 'pink',
  },
}));

const Home: React.FC<any | null> = ({ dataListPlaces }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const { state, dispatch } = useContext(ListPlacesContext);
  const { query } = useRouter();

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

    if (dataListPlaces) {
      const dataListPlacesValid = dataListPlaces.filter(({ name }) =>
        Boolean(name)
      );

      const filterdListPlaces = state.rating
        ? []
        : dataListPlacesValid.filter(({ rating }) => rating >= state.rating);

      dispatch({
        type: actionTypes.SET_LIST_PLACES,
        payload: dataListPlacesValid,
      });

      dispatch({
        type: actionTypes.SET_FILTERED_LIST_PLACES,
        payload: filterdListPlaces,
      });

      dispatch({
        type: actionTypes.SET_IS_LOADING,
        payload: false,
      });
    }
  }, [dataListPlaces]);

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
      <SEO />
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
      ? await fetchPlacesByBoundary(
          type as string,
          neLat as string,
          neLng as string,
          swLat as string,
          swLng as string
        )
      : null;

  return { props: { dataListPlaces } };
};
