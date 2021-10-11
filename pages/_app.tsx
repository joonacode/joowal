import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import Head from 'next/head';
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <ChakraProvider>
      <Head>
        <title>Joowal - Home</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href='/favicon.svg' type='image/x-icon' />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
