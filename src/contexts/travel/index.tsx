import { createContext, ReactChild } from 'react';
import { initialState, State } from './state';
import { useTravelContext } from './hooks';

export type DispatchContextType = Omit<
  ReturnType<typeof useTravelContext>,
  'state'
>;

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<DispatchContextType>(
  {} as DispatchContextType
);

const TravelContextProvider = ({ children }: { children: ReactChild }) => {
  const { state, ...dispatchActions } = useTravelContext();

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatchActions}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default TravelContextProvider;
