export default async function handler(req: any, res: any) {
  const access_token = req.query.access_token || null
  const body = req.body ? JSON.parse(req.body) : null
  
  // Spotify user uri
  const largeUri = body.userId
  const uri = largeUri.split(':')[2]

  // Playlist name and description
  const name = body.name
  const description = body.description

  // Playlist songs
  const items = body.items
  const itemmsUris = items.map((track: any) => track.uri)
  const tracks = itemmsUris.join(',')

  if (access_token) {
    const createPlaylistBody = {
      name: name,
      description: description,
      public: false
    }

    // Create the playlist
    const createResponse = await fetch(`https://api.spotify.com/v1/users/${uri}/playlists`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(createPlaylistBody)
    })
    const createData = await createResponse.json()

    if (createData.error) {

      res.status(401).json({ error: 'refresh_token' })

    } else {
      // Add the songs to the new playlist
      const newPlaylistUri = createData.uri
      const playlistUri = newPlaylistUri.split(':')[2]
      const putResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistUri}/tracks?uris=${tracks}`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const putData = await putResponse.json()

      if (putData.error) {
        // If an error ocurred
        res.status(401).json({ error: 'refresh_token' })
      } else {
        res.status(200).json({ ...createData })
      }
    }
  } else {
    res.status(401).json({ error: 'Invalid token' })
  }

}