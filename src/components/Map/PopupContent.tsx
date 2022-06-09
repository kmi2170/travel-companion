import Image from 'next/image';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
// import { blue } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  details: {
    '&:hover': { cursor: 'pointer' },
  },
}));

interface PopupContentProos {
  index: number;
  name: string;
  photo?: any;
  rating: string;
  num_reviews: string;
}

const PopupContent: React.FC<PopupContentProos> = ({
  index,
  name,
  photo,
  rating,
  num_reviews,
}) => {
  const classes = useStyles();

  return (
    <>
      {/* 
      <Image
        src={photo && photo.images && photo.images.thumbnail.url}
        height={50}
        width={50}
        alt={name}
      />
      */}
      <CardMedia
        component="img"
        image={photo && photo.images && photo.images.thumbnail.url}
        // height={500}
        width={125}
        // title={name}
        // alt={name}
      />

      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Typography
        variant="subtitle2"
        color="primary"
        id={`pContent${index}`}
        className={classes.details}
      >
        Details
      </Typography>
      <Rating
        name="read-only"
        value={+rating}
        precision={0.5}
        size="small"
        readOnly
      />
      <Typography component="legend">
        {num_reviews} review{+num_reviews > 1 && 's'}
      </Typography>
    </>
  );
};

export default PopupContent;
