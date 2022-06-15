import { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import SiteDetails from './SiteDetails';
import FloatingButton from '../FloatingButton';
import { useTravelStateContext } from '../../contexts/travel/hooks';

const useStyles = makeStyles(() => ({
  text: {},
  list: {
    height: '85vh',
    overflow: 'auto',
  },
}));

const ListSites = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const { filtered_list_sites } = useTravelStateContext();

  const popupRefs = useRef(new Array(filtered_list_sites?.length));

  const setRefs = (ref: HTMLElement, index: number) => {
    popupRefs.current[index] = ref;
  };

  return (
    <div>
      {/* 
      <Typography variant="h6" className={classes.text}>
        {list?.length} Result{list?.length > 1 && 's'} Found
      </Typography>
    */}
      <Grid container spacing={2} className={classes.list}>
        {!isDesktop && <FloatingButton />}
        {filtered_list_sites?.map((site, i) => (
          <Grid
            // id={`place${i}`}
            ref={(ref) => setRefs(ref, i)}
            item
            key={i}
            xs={12}
          >
            <SiteDetails
              index={i}
              site={site}
              ref={popupRefs}
            // ref={elRefs[i]}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ListSites;
