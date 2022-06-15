import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Form from './Form';

const useStyles = makeStyles((theme: Theme) => ({
  toolBar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense" className={classes.toolBar}>
        <Typography variant="h5" component="h1" className={classes.title}>
          Travel Companion
        </Typography>
        <Form />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
