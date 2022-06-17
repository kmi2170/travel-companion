import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import CircularProgress from '@material-ui/core/CircularProgress';

export const useCustomMap = () => {
  return useMemo(() => {
    dynamic(() => import('../components/Map'), {
      loading: () => (
        <>
          <CircularProgress />
          Map is Loading...
        </>
      ),
      ssr: false,
    });
  }, []);
};
