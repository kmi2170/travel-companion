import { useEffect } from 'react';
// import router, { useRouter } from 'next/router';
// import { GetServerSideProps } from 'next';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

// import { BoundsAPI } from '../api/type_settings';
// import { fetchLocationsByBounds } from '../api/lib/travel_advisor';
// import { fetchCurrentWeatherByBounds } from '../api/lib/open_weather';
import { ipLookup } from '../api/lib/ipLookup';

import Loading from '../components/Loading';
import Navbar from '../components/Navbar/Navbar';
import ListPlaces from '../components/ListPlaces/ListPlaces';
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

// interface HomeProps {
//   dataListPlaces?: [] | null;
//   dataListWeather?: {} | null;
// }

const Home = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const {
    list_places,
    coords,
    bounds,
    type,
    rating,
    isLoading,
  } = useTravelContext();
  const {
    setIsLoading,
    setInitCoords,
    setSitesList,
    setWeatherList,
    setFilteredSitesList,
  } = useTravelDispatchContext();
  // const { query } = useRouter();
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



  // useEffect(() => {
  //   if (
  //     dataListWeather &&
  //     dataListWeather['list'] &&
  //     dataListWeather['list'].length
  //   )
  //     dispatch({
  //       type: actionTypes.SET_LIST_WEATHER,
  //       payload: dataListWeather['list'],
  //     });
  // }, [dataListWeather]);


  // useEffect(
  //   () => {
  //     setIsLoading(true);

  // dispatch({
  //   type: actionTypes.SET_RATING,
  //   payload: 0,
  // });

  // dispatch({
  //   type: actionTypes.SET_POPUP_SELECTED,
  //   payload: { selected: null },
  // });

  // router.push({
  //   pathname: '/',
  //   query: { ...query, type: state.type },
  // });
  //   },
  //   [state.type]
  // );

  const NE_Lat = bounds?.ne?.lat
  const NE_Lng = bounds?.ne?.lng
  const SW_Lat = bounds?.sw?.lat
  const SW_Lng = bounds?.sw?.lng

  useEffect(() => {
    if (NE_Lat && NE_Lng && SW_Lat && SW_Lng) {
      setIsLoading(true);
      (async () => {
        const params = { type, NE_Lat, NE_Lng, SW_Lat, SW_Lng };
        const { data } = await axios('/api/locations', { params });
        const filteredData = data?.filter(({ name }) => Boolean(name))
          .filter(({ rating: value }) => value >= rating);
        setSitesList(data);
        setFilteredSitesList(filteredData);
      })();
      setIsLoading(false);
    }
  }, [bounds, type]);

  useEffect(() => {
    const diff_Lat = Math.abs(+NE_Lat - +SW_Lat);
    const diff_Lng = Math.abs(+NE_Lng - +SW_Lng);
    if (NE_Lat && NE_Lng && SW_Lat && SW_Lng && diff_Lat < 25.0 && diff_Lng < 25.0) {
      setIsLoading(true);
      (async () => {
        const params = { NE_Lat, NE_Lng, SW_Lat, SW_Lng };
        const { data } = await axios('/api/weather', { params });
        setWeatherList(data['list'])
        console.log(data)
      })();
      setIsLoading(false);
    }
  }, [bounds]);

  useEffect(() => {
    const filteredData = list_places?.filter(
      ({ rating: value }) => value >= rating
    ) as []
    setFilteredSitesList(filteredData);
  }, [rating]);

  return (
    <div className={classes.root}>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {isDesktop ? (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.listContainer}>
                  {isLoading ? <Loading /> : <ListPlaces />}
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
                  {isLoading ? <Loading /> : <ListPlaces />}
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

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const { type, NE_Lat, NE_Lng, SW_Lat, SW_Lng } = query;
//   const baseArgs = { NE_Lat, NE_Lng, SW_Lat, SW_Lng } as Omit<
//     BoundsAPI,
//     'type'
//   >;

//   const dataListPlaces =
//     NE_Lat && NE_Lng && SW_Lat && SW_Lng
//       ? await fetchLocationsByBounds({ type, ...baseArgs } as BoundsAPI)
//       : null;

//   const diffLat = Math.abs(+NE_Lat - +SW_Lat);
//   const diffLng = Math.abs(+NE_Lng - +SW_Lng);

//   const dataListWeather =
//     NE_Lat && NE_Lng && SW_Lat && SW_Lng && diffLat < 25.0 && diffLng < 25.0
//       ? await fetchCurrentWeatherByBounds(baseArgs)
//       : null;

//   return { props: { dataListPlaces } };
// };
