import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { blue } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

import {
  useTravelStateContext,
  useTravelDispatchContext,
} from '../../contexts/travel/hooks';
import { useMapDispatchContext } from '../../contexts/map/hooks';

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

const Form = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const { list_sites, type, rating } = useTravelStateContext();
  const { setTravelType, setTravelRating, setTravelFilteredSites } =
    useTravelDispatchContext();
  const { setMapSelectedPopup } = useMapDispatchContext();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const filteredData = list_sites?.filter(
      ({ rating: value }) => value >= rating
    ) as [];
    setTravelFilteredSites(filteredData);
  }, [rating]);

  useEffect(() => {
    setTravelRating(0);
    setMapSelectedPopup({ selected: null });
  }, [type]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handeleSetType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTravelType(e.target.value);
  };

  const handeleSetRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTravelRating(+e.target.value);
  };

  return (
    <div className={classes.formContainer}>
      {isDesktop && (
        <Typography variant="h6" align="center" className={classes.label}>
          Site
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
          value={type}
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
        <Select
          id="rating"
          value={rating}
          onChange={handeleSetRating}
          defaultValue="0"
          className={classes.select}
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="4.5">4.5 and above</MenuItem>
          <MenuItem value="4">4 and above</MenuItem>
          <MenuItem value="3">3 and above</MenuItem>
          <MenuItem value="0">All Ratings</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Form;
