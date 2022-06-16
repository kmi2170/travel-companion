import { MutableRefObject } from 'react';
import { Bounds, Coords } from '../api/type_settings';

export const getMapBoundsInit = (
  ref: MutableRefObject<any>,
  setBounds: (bounds: Bounds) => void
) => {
  const ne = ref?.current.getBounds().getNorthEast();
  const sw = ref?.current.getBounds().getSouthWest();
  setBounds({ ne, sw });
};

let bounds = [];
export const getMapBoundsOnMoveend = async (
  e: L.LeafletEvent,
  setBounds: (bounds: Bounds) => void
) => {
  try {
    const ne = e.target.getBounds().getNorthEast();
    const sw = e.target.getBounds().getSouthWest();
    bounds.push({ ne, sw });

    // call API only for the last pushed data during 5s to reduce the number of API calls
    await new Promise(() => {
      setTimeout(() => {
        if (bounds.length > 0) {
          setBounds(bounds[bounds.length - 1]);
          bounds = [];
        }
      }, 5000);
    });
  } catch (error) {
    console.error(error);
  }
};

let centers = [];
export const getMapCenterOnMoveend = async (
  e: L.LeafletEvent,
  setCoords: (lat_lng: Coords) => void
) => {
  try {
    const center = e.target.getCenter();
    centers.push(center);

    await new Promise(() =>
      setTimeout(() => {
        if (centers.length > 0) {
          setCoords(centers[centers.length - 1]);
          centers = [];
        }
      }, 5000)
    );
  } catch (error) {
    console.error(error);
  }
};
