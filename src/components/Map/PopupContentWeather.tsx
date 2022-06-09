// import Image from 'next/image';
import {
  Typography,
  // Box,
  // IconButton,
  // Card,
  // CardMedia,
  // CardContent,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  textTemp: { color: grey[500] },
}));

interface PopupContentWeatherProps {
  description: string;
  temp: number;
}

const PopupContentWeather: React.FC<PopupContentWeatherProps> = ({
  description,
  temp,
}) => {
  const classes = useStyles();

  const formatNumber = (value: number) =>
    value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        {description}
      </Typography>
      <Typography variant="h6" align="center" className={classes.textTemp}>
        {formatNumber(temp)}&#8457; ({formatNumber((temp - 32) * 0.55)}&#8451;)
      </Typography>
    </>
  );
};

export default PopupContentWeather;
