import { createContext, ReactChild } from 'react';
import { initialState, State } from './state';
import { useTravelForContext } from './hooks';

export type TravelDispatchContextType = Omit<
  ReturnType<typeof useTravelForContext>,
  'state'
>;

export const TravelContext = createContext<State>(initialState);
export const TravelDispatchContext = createContext<TravelDispatchContextType>(
  {} as TravelDispatchContextType
);

const TravelContextProvider = ({ children }: { children: ReactChild }) => {
  const { state, ...dispatchActions } = useTravelForContext();

  return (
    <TravelContext.Provider value={state}>
      <TravelDispatchContext.Provider value={dispatchActions}>
        {children}
      </TravelDispatchContext.Provider>
    </TravelContext.Provider>
  );
};

export default TravelContextProvider;
