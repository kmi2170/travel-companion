import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  details: {
    '&:hover': { cursor: 'pointer' },
  },
}));

interface PopupProos {
  index: number;
  name: string;
  photo?: any;
  rating: string;
  num_reviews: string;
}

const PopupContent = ({
  index,
  name,
  photo,
  rating,
  num_reviews,
}: PopupProos) => {
  const classes = useStyles();

  return (
    <>
      <CardMedia
        component="img"
        image={photo?.images?.thumbnail.url}
        width={125}
        alt={name}
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
