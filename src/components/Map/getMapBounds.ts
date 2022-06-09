export const getMapBoundsInit = (
  mapRef: any,
  actionTypes: string,
  dispatch: ({}) => void
) => {
  const ne = mapRef?.current.getBounds().getNorthEast();
  const sw = mapRef?.current.getBounds().getSouthWest();

  dispatch({
    type: actionTypes,
    payload: { ne, sw },
  });
};

let bounds = [];

export const getMapBoundsOnMoveend = async (
  e: any,
  actionTypes: string,
  dispatch: ({}) => void
) => {
  const ne = e.target.getBounds().getNorthEast();
  const sw = e.target.getBounds().getSouthWest();
  bounds.push({ ne, sw });

  await new Promise(() =>
    setTimeout(() => {
      if (bounds.length > 0) {
        dispatch({
          type: actionTypes,
          payload: bounds[bounds.length - 1],
        });
        console.log(bounds[bounds.length - 1]);

        bounds = [];
      }
    }, 5000)
  );
};

let centers = [];
let zooms = [];

export const getMapCenterZoomOnMoveend = async (
  e: any,
  actionTypes: string,
  dispatch: ({}) => void
) => {
  const center = e.getCenter();
  const zoom = e.getZoom();
  centers.push(center);
  zooms.push(zoom);

  await new Promise(() =>
    setTimeout(() => {
      if (centers.length > 0) {
        dispatch({
          type: actionTypes,
          payload: centers[centers.length - 1],
        });

        console.log(centers[centers.length - 1]);
        console.log(zooms[zooms.length - 1]);

        centers = [];
        zooms = [];
      }
    }, 5000)
  );
};
