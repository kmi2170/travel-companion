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
    case actionTypes.SET_LIST_SITES:
      return { ...state, list_sites: action.payload };
    case actionTypes.SET_FILTERED_LIST_SITES:
      return { ...state, filtered_list_sites: action.payload };
    case actionTypes.SET_LIST_WEATHER:
      return { ...state, list_weather: action.payload };
    case actionTypes.SET_TYPE:
      return { ...state, type: action.payload };
    case actionTypes.SET_RATING:
      return { ...state, rating: action.payload };
    case actionTypes.SET_POPUP_SELECTED:
      return { ...state, popups: action.payload };
    case actionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};