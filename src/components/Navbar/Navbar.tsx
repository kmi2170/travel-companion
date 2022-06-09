import { AppBar, Toolbar, Typography } from '@material-ui/core';
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

const Navbar: React.FC = () => {
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
