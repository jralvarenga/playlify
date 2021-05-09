# Discoverify

Create new playlists and discover new music from just one song

## Instalation

Go to the folder where you clone this rep and run:

```bash
yarn
# or
npm install # If you want to use npm instead
```

### Spotify API

1. Go to the [Spotify Dashboard](https://developer.spotify.com/dashboard/applications) and open your proyect
2. Copy the Client ID and Client Secret and add it on your .env file
3. Go to settings and add your Website url - https://yourappnameexample.com
4. Add your callback links on Redirect URIs - http://localhost/callback and/or https://yourappnameexample.com/callback

### Enviroment variables

Then create your .env file and place in the root and add this:

````bash
CLIENT_ID=xxxxxxxxxx
CLIENT_SECRET=xxxxxxxxxx
REDIRECT_URI=xxxxxxxxxx
CLIENT_URI=xxxxxxxxxx
````

## Development

To start development run:

```bash
yarn dev
# or
npm run dev
```

To see a preview of the app on a server run:

```bash
yarn build
# then
yarn start
```

## Deploy

This app is available in [https://playlify.vercel.app]

To deploy on Vercel or any hosting with SSR capability just add the env variables on the server
