import { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import PlaceDetails from './PlaceDetails';
import FloatingButton from '../FloatingButton';
import { useTravelContext } from '../../context/hooks';

const useStyles = makeStyles(() => ({
  text: {},
  list: {
    height: '85vh',
    overflow: 'auto',
  },
}));

const ListPlaces = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const { filtered_list_places } = useTravelContext();

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
            // id={`place${i}`}
            ref={(ref) => setRefs(ref, i)}
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
