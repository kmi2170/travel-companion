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
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListRestaurantsContext, actionTypes } from '../reducer/reducer';
import { fetchRestaurantsByBoundary } from '../api/lib/travel_advisor';
import { getPlaceDate } from '../api/lib/trevel_advisor2';

import SEO from '../components/SEO';
import ListRestaurants from '../components/ListRestaurants';
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

const Home: React.FC<any> = ({ dataListRestaurants }) => {
  const classes = useStyles();

  const { state, dispatch } = useContext(ListRestaurantsContext);
  // const { query } = useRouter();

  useEffect(() => {
    if (dataListRestaurants) {
      dispatch({
        type: actionTypes.SET_LIST_RESTAURANTS,
        payload: dataListRestaurants,
      });
    }
  }, [dataListRestaurants, dispatch]);

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
      dynamic(() => import('../components/MapLeaflet/MapLeaflet'), {
        loading: () => displayLoading(),
        ssr: false,
      }),
    []
  );

  return (
    <div className={classes.root}>
      <SEO />
      <Container>
        <Typography variant="h3" component="h1">
          Restaurant Finder
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ListRestaurants />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map />
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { neLat, neLng, swLat, swLng } = query;

  const dataListRestaurants =
    neLat && neLng && swLat && swLng
      ? await fetchRestaurantsByBoundary(
          neLat as string,
          neLng as string,
          swLat as string,
          swLng as string
        )
      : null;

  return { props: { dataListRestaurants } };
};
