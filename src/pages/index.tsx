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
import { fetchRestaurantsByBoundary } from '../api/lib/travel_advisor';

import SEO from '../components/SEO';
import ListPlaces from '../components/ListPlaces/ListPlaces';
import Footer from '../components/Footer';

// const url = 'https://api.adviceslip.com/advice';

// const fetcher = async (url: string) => {
//   try {
//     const { data } = await axios(url);
//     // console.log(data);
//     return data;
//   } catch (error) {
//     console.error();
//   }
// };

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
  // const { query } = useRouter();

  useEffect(() => {
    if (dataListPlaces) {
      const filterdDataListPlaces = dataListPlaces.filter((place) =>
        place.name ? true : false
      );
      dispatch({
        type: actionTypes.SET_LIST_RESTAURANTS,
        payload: filterdDataListPlaces,
        //payload: dataListPlaces,
      });
    }
  }, [dataListPlaces, dispatch]);

  useEffect(() => {
    if (state.bounds.ne.lat && state.bounds.ne.lng) {
      router.push({
        pathname: '/',
        query: {
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
      <Container maxWidth="xl">
        {/*
        <Typography variant="h3" component="h1">
          Restaurant Finder
        </Typography>
      */}
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
  const { neLat, neLng, swLat, swLng } = query;

  const dataListPlaces =
    neLat && neLng && swLat && swLng
      ? await fetchRestaurantsByBoundary(
          neLat as string,
          neLng as string,
          swLat as string,
          swLng as string
        )
      : null;

  return { props: { dataListPlaces } };
};
