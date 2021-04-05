import querystring from 'querystring'

export default async function handler(req: any, res: any) {
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const refreshToken = req.query.refresh_token

  if (refreshToken == null) {
    return null
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      })
      const data = await response.json()

      res.status(200).json({ token: data.access_token })
    } catch (error) {
      res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`)
    }
}