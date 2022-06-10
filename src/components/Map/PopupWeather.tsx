import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  textTemp: { color: grey[500] },
}));

interface PopupWeatherProps {
  description: string;
  temp: number;
}

const PopupWeather = ({ description, temp }: PopupWeatherProps) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        {description}
      </Typography>
      <Typography variant="h6" align="center" className={classes.textTemp}>
        {Math.round(temp)}&#8457; ({Math.round((temp - 32) * 0.55)}&#8451;)
      </Typography>
    </>
  );
};

export default PopupWeather;
