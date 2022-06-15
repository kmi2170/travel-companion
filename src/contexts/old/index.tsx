import { createContext, ReactChild } from 'react';
import { initialState, State } from './state';
import { useTravelContext } from './hooks';

export type TravelDispatchContextType = Omit<
  ReturnType<typeof useTravelContext>,
  'state'
>;

export const TravelStateContext = createContext<State>(initialState);
export const TravelDispatchContext = createContext<TravelDispatchContextType>(
  {} as TravelDispatchContextType
);

const TravelContextProvider = ({ children }: { children: ReactChild }) => {
  const { state, ...dispatchActions } = useTravelContext();

  return (
    <TravelContext.Provider value={state}>
      <TravelDispatchContext.Provider value={dispatchActions}>
        {children}
      </TravelDispatchContext.Provider>
    </TravelContext.Provider>
  );
};

export default TravelContextProvider;
