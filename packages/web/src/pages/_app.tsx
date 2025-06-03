import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Roboto } from 'next/font/google';
import '@/styles/index.scss';

/** Library */
import Lib from '@/lib';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  Lib.utils.setConfiguration({
    baseApiUrl: 'http://localhost:4000',
  });

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon/favicon.ico' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/favicon/android-chrome-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='512x512'
          href='/favicon/android-chrome-512x512.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta
          name='msapplication-TileImage'
          content='/favicon/mstile-144x144.png'
        />
        <meta
          name='msapplication-config'
          content='/favicon/browserconfig.xml'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <title>F1 - Fuel Hub</title>
        <meta
          name='description'
          content='F1-FuelHub is your fast lane to live standings, driver stats, car tech and circuit insights—everything a Formula 1 fan needs, turbocharged.'
        />
      </Head>

      <main className={`${roboto.variable} antialiased`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
