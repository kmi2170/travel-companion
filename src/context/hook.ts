import { useContext } from 'react';
import { ListPlacesContext, ListPlacesContextProps } from '.';

export const useCustomContext = () => {
  return useContext<ListPlacesContextProps>(ListPlacesContext);
};
