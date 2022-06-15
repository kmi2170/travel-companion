import { createContext, ReactChild } from 'react';
import { initialState, State } from './state';
import { useMapContext } from './hooks';

export type DispatchContextType = Omit<
  ReturnType<typeof useMapContext>,
  'state'
>;

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<DispatchContextType>(
  {} as DispatchContextType
);

const MapContextProvider = ({ children }: { children: ReactChild }) => {
  const { state, ...dispatchActions } = useMapContext();

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatchActions}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default MapContextProvider;
