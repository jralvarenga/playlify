export default async function handler(req: any, res: any) {
  const access_token = req.query.access_token || null

  if (access_token) {
    const response = await fetch('https://api.spotify.com/v1/me', {
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