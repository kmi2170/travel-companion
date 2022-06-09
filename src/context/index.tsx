import { createContext, useReducer, useMemo } from 'react';
import { reducer } from './reducer';
import { initialState, State } from './state';
import { ActionsType } from './actions';

export interface ListPlacesContextProps {
  state: State;
  dispatch: React.Dispatch<ActionsType>;
}

export const ListPlacesContext = createContext<ListPlacesContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

const ListPlacesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => {
      return { state, dispatch };
    },
    [state, dispatch]
  );

  return (
    <ListPlacesContext.Provider value={value}>
      {children}
    </ListPlacesContext.Provider>
  );
};

export default ListPlacesContextProvider;
