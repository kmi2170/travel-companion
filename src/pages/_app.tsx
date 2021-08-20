import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Head from 'next/head';

// import { QueryClientProvider } from 'react-query';
// import { Hydrate } from 'react-query/hydration';
// import queryClient from '../utils/reactQuery';
// import { ReactQueryDevtools } from 'react-query/devtools';

import ListRestaurantsContextProvider from '../reducer/reducer';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme/theme';

import '../styles/globals.css';
import '../styles/geosearch.css';
//import 'node_modules/leaflet-geosearch/dist/geosearch.css';

import * as gtag from '../lib/gtag';

// const queryClient = new QueryClient();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      {/* <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}> */}
      <Head>
        <title>Advice Appli</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ListRestaurantsContextProvider>
        <Component {...pageProps} />
      </ListRestaurantsContextProvider>
      {/* <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider> */}
    </ThemeProvider>
  );
};

export default MyApp;
