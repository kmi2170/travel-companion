import { createContext, useReducer, useMemo } from 'react';
// import { CoordsType, BoundsType } from '../api/type_settings';
import { reducer } from './reducer';
import { initialState, State } from './state';
import { ActionsType } from './actions';

export const ListPlacesContext = createContext<{
  state: State;
  dispatch: React.Dispatch<ActionsType>;
}>({ state: initialState, dispatch: () => null });

const ListPlacesContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(
    () => {
      return { state, dispatch };
    },
    [state, dispatch]
  );

  return (
    <ListPlacesContext.Provider value={contextValue}>
      {children}
    </ListPlacesContext.Provider>
  );
};

export default ListPlacesContextProvider;
