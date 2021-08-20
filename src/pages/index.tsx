import { useEffect, useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext, actionTypes } from '../reducer/reducer';
import { fetchPlacesByBoundary } from '../api/lib/travel_advisor';

import SEO from '../components/SEO';
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
}));

const Home: React.FC<any | null> = ({ dataListPlaces }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const { state, dispatch } = useContext(ListPlacesContext);
  const { query } = useRouter();

  useEffect(() => {
    if (dataListPlaces) {
      const filterdDataListPlaces = dataListPlaces.filter(({ name }) =>
        Boolean(name)
      );

      dispatch({
        type: actionTypes.SET_LIST_PLACES,
        payload: filterdDataListPlaces,
      });
      dispatch({
        type: actionTypes.SET_FILTERED_LIST_PLACES,
        payload: null,
      });
    }
  }, [dataListPlaces, dispatch]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_RATING,
      payload: 0,
    });

    router.push({
      pathname: '/',
      query: { ...query, type: state.type },
    });
  }, [state.type]);

  useEffect(() => {
    const filterdListPlaces = state.list_places?.filter(
      ({ rating }) => rating >= state.rating
    );

    dispatch({
      type: actionTypes.SET_FILTERED_LIST_PLACES,
      payload: filterdListPlaces as [],
    });
  }, [state.rating]);

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

  const displayLoading = () => <CircularProgress />;

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
                <Map />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ListPlaces />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <ListPlaces />
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <Map />
              </Grid>
            </>
          )}
        </Grid>
        <Footer />
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
