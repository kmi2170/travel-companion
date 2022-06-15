import { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import SiteDetails from './SiteDetails';
import FloatingButton from '../FloatingButton';
import { useTravelStateContext } from '../../contexts/travel/hooks';

const useStyles = makeStyles(() => ({
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
      {filtered_list_sites?.length > 0 && (
        <Typography variant="h6">
          {filtered_list_sites.length} Result{filtered_list_sites.length > 1 && 's'} Found
        </Typography>
      )}
      <Grid container spacing={2} className={classes.list}>
        {!isDesktop && <FloatingButton />}
        {filtered_list_sites?.map((site, i) => (
          <Grid
            ref={(ref) => setRefs(ref, i)}
            item
            key={i}
            xs={12}
          >
            <SiteDetails
              index={i}
              site={site}
              ref={popupRefs}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ListSites;
