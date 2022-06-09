import { useRef } from 'react';

import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import PlaceDetails from './PlaceDetails';
import FloatingButton from '../FloatingButton';
import { useCustomContext } from '../../context/hook';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  list: {
    height: '85vh',
    overflow: 'auto',
  },
}));

const ListPlaces: React.FC = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const { state } = useCustomContext();

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
      {/* 
      <Typography variant="h6" className={classes.text}>
        {list?.length} Result{list?.length > 1 && 's'} Found
      </Typography>
    */}
      <Grid container spacing={2} className={classes.list}>
        {!isDesktop && <FloatingButton />}
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
