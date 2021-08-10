import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

// import { GetServerSideProps, GetStaticProps } from 'next';

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

const Home: React.FC = () => {
  const classes = useStyles();

  // const [advice, setAdvice] = useState('');

  // useEffect(() => {
  //   const fetch = async (url: string) => {
  //     const res = await fetcher(url);
  //     setAdvice(res);
  //     console.log(res);
  //   };

  //   fetch(url);
  // }, []);

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
