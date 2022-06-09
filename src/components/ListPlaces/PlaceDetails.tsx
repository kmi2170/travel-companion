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

import { useCustomContext } from '../../context/hook';

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

interface PlaceDetailsProps {
  index: number;
  place: any;
}

const PlaceDetails = (
  { index, place }: PlaceDetailsProps,
  ref: React.MutableRefObject<HTMLDivElement[]>
) => {
  //const PlaceDetails: React.FC<any> = ({ place }, ref: React.MutableRefObject<HTMLDivElement>)) => {
  const classes = useStyles();
  const { state } = useCustomContext();

  if (state.popups.selected === index) {
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
          image={place.photo && place.photo.images.large.url}
          title={place.name}
          alt={place.name}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {place.name}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Rating
              name="read-only"
              value={+place.rating}
              precision={0.5}
              readOnly
            />
            <Typography component="legend">
              {place.num_reviews} review{+place.num_reviews > 1 && 's'}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Price Range</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {place.price_level}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {place.ranking}
            </Typography>
          </Box>
          {place?.awards?.map((award, i) => (
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
          {place?.cuisine?.map(({ name }) => (
            <Chip
              key={name}
              size="small"
              label={name}
              className={classes.chip}
            />
          ))}
          {place?.address && (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.address}
            >
              <LocationOnIcon />
              {place.address}
            </Typography>
          )}
          {place?.phone && (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.phone}
            >
              <PhoneIcon />
              {place.phone}
            </Typography>
          )}
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.web_url, '_blank')}
            >
              Trip Advisor
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.website, '_blank')}
            >
              Website
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default forwardRef(PlaceDetails);
//export default PlaceDetails;
