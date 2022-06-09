import { Typography, Fab } from '@material-ui/core';
import { Navigation as NavigationIcon } from '@material-ui/icons';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useCustomContext } from '../context/hook';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  fab: {
    position: 'absolute',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    opacity: 0.8,
  },
  extendedIcon: {
    // marginRight: theme.spacing(0),
  },
}));

const Component: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useCustomContext();

  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className={classes.root}>
      <Fab
        size="small"
        variant="extended"
        onClick={handleClick}
        className={classes.fab}
      >
        <NavigationIcon className={classes.extendedIcon} />
        Back to Map
      </Fab>
    </div>
  );
};

export default Component;
