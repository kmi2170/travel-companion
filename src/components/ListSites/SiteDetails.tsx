import { forwardRef } from 'react';
import Image from 'next/image';

import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from '@material-ui/core';
import {
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
} from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useTravelStateContext } from '../../contexts/travel/hooks';
import { useMapStateContext } from '../../contexts/map/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: theme.spacing(0, 0, 1, 1),
  },
  address: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phone: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

interface SiteDetailsProps {
  index: number;
  site: any;
}

const SiteDetails = (
  { index, site }: SiteDetailsProps,
  ref: React.MutableRefObject<HTMLDivElement[]>
) => {
  //const PlaceDetails: React.FC<any> = ({ site }, ref: React.MutableRefObject<HTMLDivElement>)) => {
  const classes = useStyles();
  const { popups } = useMapStateContext();

  if (popups.selected === index) {
    ref?.current[index].scrollIntoView();
    //ref?.scrollIntoView({ block: 'start' });
    // ref?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // window.scroll(0, ref?.current.offsetTop - 30);
    // console.log(ref);
  }

  return (
    <div>
      <Card elevation={6}>
        <CardMedia
          component="img"
          height={300}
          image={site.photo && site.photo.images.large.url}
          title={site.name}
          alt={site.name}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {site.name}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Rating
              name="read-only"
              value={+site.rating}
              precision={0.5}
              readOnly
            />
            <Typography component="legend">
              {site.num_reviews} review{+site.num_reviews > 1 && 's'}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Price Range</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {site.price_level}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {site.ranking}
            </Typography>
          </Box>
          {site?.awards?.map((award, i) => (
            <Box
              key={i}
              my={1}
              display="flex"
              justifyContent="space-between"
              alignItems="cener"
            >
              <Image
                src="/icons/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg"
                //src={award.images.small}
                height={20}
                width={20}
                alt={award.display_name}
              />
              {/*
               */}
              <Typography variant="subtitle2" color="textSecondary">
                {award.display_name}
              </Typography>
            </Box>
          ))}
          {site?.cuisine?.map(({ name }) => (
            <Chip
              key={name}
              size="small"
              label={name}
              className={classes.chip}
            />
          ))}
          {site?.address && (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.address}
            >
              <LocationOnIcon />
              {site.address}
            </Typography>
          )}
          {site?.phone && (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.phone}
            >
              <PhoneIcon />
              {site.phone}
            </Typography>
          )}
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(site.web_url, '_blank')}
            >
              Trip Advisor
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(site.website, '_blank')}
            >
              Website
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default forwardRef(SiteDetails);
//export default PlaceDetails;
