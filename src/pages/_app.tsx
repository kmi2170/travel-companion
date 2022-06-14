import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CookiesProvider } from 'react-cookie';

import SEO from '../components/SEO';
import TravelContextProvider from '../context';

import * as gtag from '../lib/gtag';
import theme from '../theme/theme';
import '../styles/globals.css';
import '../styles/geosearch.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();
  useEffect(
    () => {
      const handleRouteChange = (url) => {
        gtag.pageview(url);
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    },
    [router.events]
  );

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <SEO />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <CookiesProvider>
        <TravelContextProvider>
          <Component {...pageProps} />
        </TravelContextProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
};

export default MyApp;
