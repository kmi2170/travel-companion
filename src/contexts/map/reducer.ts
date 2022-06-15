import { State } from './state';
import { actionTypes, ActionType } from './actions';

export const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case actionTypes.SET_INIT_COORDS:
      return { ...state, init_coords: action.payload };
    case actionTypes.SET_COORDS:
      return { ...state, coords: action.payload };
    case actionTypes.SET_BOUNDS:
      return { ...state, bounds: action.payload };
    case actionTypes.SET_POPUP_SELECTED:
      return { ...state, popups: action.payload };
    default:
      return state;
  }
};
