import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ListSites from '../components/ListSites';
import Footer from '../components/Footer';
import { useCustomMap } from '../hooks/useCustomMap';
import { useAsyncWeather } from '../hooks/useAsyncWeather';
import { useAsyncTravel } from '../hooks/useAsyncTravel';
import { useSetMapInitCoords } from '../hooks/useSetMapInitCoords';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
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
}));

const Home = () => {
  const classes = useStyles();

  const Map = useCustomMap();

  useSetMapInitCoords();

  const { isLoading } = useAsyncTravel();

  useAsyncWeather();

  return (
    <div className={classes.root}>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
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
        </Grid>
        <div className={classes.footerContaienr}>
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default Home;
