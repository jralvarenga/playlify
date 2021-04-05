import Head from "next/head"
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from '../services/AuthProvider'
import { NewPlaylistProvider } from '../services/NewPlaylistProvider'
import { theme } from '../services/theme'

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="Create playlist with just one song" />
        <meta name="keywords" content="spotify,playlist,song,create,podcast" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#191414" />
        <title>Discoverify</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="manifest" href="manifest.json"/>
        <link rel="stylesheet" href="global.css"/>
        <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet' />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <NewPlaylistProvider>
            <Component {...pageProps} />
          </NewPlaylistProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp