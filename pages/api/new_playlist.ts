export default async function handler(req: any, res: any) {
  const access_token = req.query.access_token || null

  // Querys to retrieve a new playlist
  const artist = req.query.artist || null
  const track = req.query.track || null
  const genres = req.query.genres || null

  const limitArr = [26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
  const limit = limitArr[Math.floor(Math.random() * limitArr.length)]

  if (access_token) {
    const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${artist}&seed_genres=${genres}&seed_tracks=${track}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    const data = await response.json()
    if (data.error) {
      res.status(401).json({ error: 'refresh_token' })
    } else {
      res.status(200).json({ ...data })
    }
  } else {
    res.status(401).json({ error: 'Invalid token' })
  }

}