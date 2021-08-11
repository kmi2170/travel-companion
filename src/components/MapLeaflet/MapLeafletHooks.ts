import { useContext } from 'react';
import { useMapEvent } from 'react-leaflet';
import { ListRestaurantsContext, actionTypes } from '../../reducer/reducer';

let coords = [];

export const GetBounds = () => {
  const { dispatch } = useContext(ListRestaurantsContext);

  const map = useMapEvent('moveend', async () => {
    const ne = map.getBounds().getNorthEast();
    const sw = map.getBounds().getSouthWest();

    coords.push({ ne, sw });
    // console.log(coords);

    await new Promise(() =>
      setTimeout(() => {
        if (coords.length > 0) {
          dispatch({
            type: actionTypes.SET_BOUNDS,
            payload: coords[coords.length - 1],
          });
          console.log(coords[coords.length - 1]);

          coords = [];
        }
      }, 5000)
    );
  });

  return null;
};

// export const GetBoundsOnLoad = () => {
//   const { dispatch } = useContext(ListRestaurantsContext);

//   // const map = useMap();
//   const map = useMapEvent('load', async () => {
//     const ne = map.getBounds().getNorthEast();
//     const sw = map.getBounds().getSouthWest();

//     console.log({ ne, sw });

//     dispatch({
//       type: actionTypes.SET_BOUNDS,
//       payload: { ne, sw },
//     });
//   });

//   return null;
// };
