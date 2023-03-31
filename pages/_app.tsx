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
    <>
      <Head>
        <title>Joowal - Joona Wallpaper</title>
        <meta name='title' content='Joona Wallpaper' />
        <meta name='description' content='Download wallpaper full hd' />
        <meta
          name='keywords'
          content='download wallpaper, wallpaper, high res image, photo, nature, galaxy'
        />
        <meta name='robots' content='index, follow' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_MAIN_URL} />
        <meta property='og:title' content='Joowal - Joona Wallpaper' />
        <meta property='og:description' content='Download wallpaper full hd' />
        <meta
          property='og:image'
          content={process.env.NEXT_PUBLIC_MAIN_URL + 'images/logo.png'}
        />

        <meta property='og:locale' content='id' />
        <meta property='og:image:alt' content='logo' />
        <meta property='og:image:type' content='png' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:url'
          content={process.env.NEXT_PUBLIC_MAIN_URL}
        />
        <meta property='twitter:title' content='Joowal - Joona Wallpaper' />
        <meta
          property='twitter:description'
          content='Download wallpaper full hd'
        />
        <meta
          property='twitter:image'
          content={process.env.NEXT_PUBLIC_MAIN_URL + 'images/logo.png'}
        />
        <link rel='shortcut icon' href='/favicon.svg' type='image/x-icon' />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
export default MyApp;
