import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2">
            Copyrihgt &copy; kmi {year}. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default memo(Footer);
