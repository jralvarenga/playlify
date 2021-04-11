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
        <meta name="description" content="Create new playlists and discover new music from just one song" />
        <meta name="keywords" content="spotify,playlist,song,create,podcast" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#191414" />

        <meta name="description" content="Create new playlists and discover new music from just one song" />
        <meta property="og:title" content="Playlify" />
        <meta property="og:description" content="Create new playlists and discover new music from just one song" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://playlify.vercel.app" />
        <meta property="og:site_name" content="Playlify" />
        <meta property="og:image" content="/icons/icon-512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://playlify.vercel.app" />
        <meta name="twitter:site" content="@rigo_alvarenga1" />
        <meta name="twitter:creator" content="@rigo_alvarenga1" />
        <meta name="twitter:title" content="Playlify" />
        <meta name="twitter:description" content="Create new playlists and discover new music from just one song" />
        <meta name="twitter:image" content="/icons/icon-512.png" />
        <meta name="twitter:image:alt" content="Playlify" />

        <title>Playlify</title>

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