import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  InputLabel,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { actionTypes } from '../../context/actions';
import { useCustomContext } from '../../context/hook';

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // minWidth: '300px',
    background: blue[800],
  },
  formControl: {
    marginRight: theme.spacing(2),
    // margin: theme.spacing(0),
    // minWidth: 125,
  },
  label: {
    font: 'white',
    margin: theme.spacing(0, 2),
  },
  select: {
    background: 'white',
  },
}));

const Component: React.FC = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const { state, dispatch } = useCustomContext();

  const handeleSetType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: actionTypes.SET_TYPE, payload: e.target.value });
  };

  const handeleSetRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: actionTypes.SET_RATING, payload: +e.target.value });
  };

  return (
    <div className={classes.formContainer}>
      {isDesktop && (
        <Typography variant="h6" align="center" className={classes.label}>
          Type
        </Typography>
      )}
      <FormControl
        variant="outlined"
        size="small"
        margin="none"
        className={classes.formControl}
      >
        <Select
          id="rating"
          value={state.type}
          onChange={handeleSetType}
          defaultValue="restaurants"
          className={classes.select}
        >
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      {isDesktop && (
        <Typography variant="h6" align="center" className={classes.label}>
          Rating
        </Typography>
      )}
      <FormControl
        variant="outlined"
        size="small"
        margin="none"
        className={classes.formControl}
      >
        {/*
        <InputLabel id="rating" margin="dense" shrink>
          Rating
        </InputLabel>
         */}
        <Select
          id="rating"
          value={state.rating}
          onChange={handeleSetRating}
          defaultValue="0"
          className={classes.select}
        >
          <MenuItem value="0">All Ratings</MenuItem>
          <MenuItem value="3">3 and above</MenuItem>
          <MenuItem value="4">4 and above</MenuItem>
          <MenuItem value="4.5">4.5 and above</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Component;
