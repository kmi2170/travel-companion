import { useState, useEffect, useContext, useRef, createRef } from 'react';

import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListPlacesContext } from '../../reducer/reducer';
import PlaceDetails from './PlaceDetails';
import FloatingButton from '../FloatingButton';
import Preview from '../Preview';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  list: {
    // margin: theme.spacing(1),
    height: '75vh',
    overflow: 'auto',
  },
}));

const ListPlaces: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const { state } = useContext(ListPlacesContext);

  // const [elRefs, setElRefs] = useState([]);
  // useEffect(() => {
  //   setElRefs((refs) =>
  //     Array(state.list_places?.length)
  //       .fill()
  //       .map((_, i) => refs[i] || createRef())
  //   );
  // }, [state.list_places]);

  const popupRefs = useRef(new Array(state.list_places?.length));

  const setRefs = (ref: HTMLElement, index: number) => {
    popupRefs.current[index] = ref;
  };

  const list = state.filtered_list_places?.length
    ? state.filtered_list_places
    : state.list_places;

  return (
    <div>
      <Typography variant="h6" className={classes.text}>
        {list?.length} Result{list?.length > 1 && 's'} Found
      </Typography>
      <Grid container spacing={2} className={classes.list}>
        {!matches && <FloatingButton />}
        {list?.map((place, i) => (
          <Grid
            id={`place${i}`}
            ref={(ref) => setRefs(ref, i)}
            // ref={elRefs[i]}
            item
            key={i}
            xs={12}
          >
            <PlaceDetails
              index={i}
              place={place}
              ref={popupRefs}
              // ref={elRefs[i]}
            />
          </Grid>
        ))}
      </Grid>

      {/* 
      <Preview data={state.bounds} />
      <Preview data={state.list_places} />
      */}
    </div>
  );
};

export default ListPlaces;
