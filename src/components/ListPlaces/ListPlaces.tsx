import { useMemo, useRef } from 'react';

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

const ListPlaces = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const { state: { filtered_list_places }
  } = useCustomContext();

  // const [elRefs, setElRefs] = useState([]);
  // useEffect(() => {
  //   setElRefs((refs) =>
  //     Array(state.list_places?.length)
  //       .fill()
  //       .map((_, i) => refs[i] || createRef())
  //   );
  // }, [state.list_places]);

  const popupRefs = useRef(new Array(filtered_list_places?.length));

  const setRefs = (ref: HTMLElement, index: number) => {
    popupRefs.current[index] = ref;
  };

  // const list = useMemo(
  //   () => {
  //     return filtered_list_places?.length ? filtered_list_places : list_places
  //   }, [filtered_list_places])
  // console.log('list')
  // console.log(filtered_list_places)


  return (
    <div>
      {/* 
      <Typography variant="h6" className={classes.text}>
        {list?.length} Result{list?.length > 1 && 's'} Found
      </Typography>
    */}
      <Grid container spacing={2} className={classes.list}>
        {!isDesktop && <FloatingButton />}
        {filtered_list_places?.map((place, i) => (
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
    </div>
  );
};

export default ListPlaces;
