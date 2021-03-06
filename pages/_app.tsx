import Head from "next/head"
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from '../services/AuthProvider'
import { NewPlaylistProvider } from '../services/NewPlaylistProvider'
import { theme } from '../services/theme'

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        {/* Primary Metas */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />

        <title>Playlify - New Playlists with one song</title>

        <meta name="title" content="Playlify - New Playlists with one song" />
        <meta name="description" content="Create new playlists and discover new music from just one song" />
        <meta name="keywords" content="spotify,playlist,song,create,podcast" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://playlify.vercel.app/" />
        <meta property="og:title" content="Playlify - New Playlists with one song" />
        <meta property="og:description" content="Create new playlists and discover new music from just one song" />
        <meta property="og:image" content="/icons/icon-512.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://playlify.vercel.app/" />
        <meta property="twitter:title" content="Playlify - New Playlists with one song" />
        <meta property="twitter:description" content="Create new playlists and discover new music from just one song" />
        <meta property="twitter:image" content="/icons/icon-512.png" />

        {/* Manifest */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="manifest" href="manifest.json"/>
        <link rel="stylesheet" href="global.css"/>
        <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet' />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#191414" />
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