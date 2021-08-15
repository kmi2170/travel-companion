import Image from 'next/image';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

interface PopupContentProos {
  name: string;
  photo?: any;
  rating: string;
  num_reviews: string;
}

const PopupContent: React.FC<PopupContentProos> = ({
  name,
  photo,
  rating,
  num_reviews,
}) => {
  return (
    <>
      {/* 
      <Card elevation={6}>

        <CardContent>
        </CardContent>
      </Card>
      <Image
        src={photo && photo.images && photo.images.thumbnail.url}
        height={50}
        width={50}
        alt={name}
      />
      <CardMedia
        component="img"
        image={photo && photo.images && photo.images.thumbnail.url}
        // height={500}
        title={name}
        alt={name}
      />
      */}
      <Typography variant="subtitle2" gutterBottom>
        {name}
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
      {/*
      <Box display="flex" justifyContent="space-between">
      </Box>
        
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Ranking</Typography>
        <Typography variant="subtitle1" gutterBottom>
          {rating}
        </Typography>
      </Box>
      */}
    </>
  );
};

export default PopupContent;
