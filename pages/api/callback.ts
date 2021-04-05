import querystring from 'querystring'
import { serialize } from 'cookie'

export default async function handler(req: any, res: any) {

  const code = req.query.code || null
  const state = req.query.state || null
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const storedState = req.cookies ? req.cookies['auth_state'] : null

  if (state === null || state !== storedState) {
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`)
  } else {
    res.setHeader('Set-Cookie', [
      serialize('auth_state', '', {
        maxAge: -1,
        path: '/',
      })
    ])
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: process.env.REDIRECT_URI
        })
      })
      const data = await response.json()
      const accessToken = data.access_token
      const refreshToken = data.refresh_token

      // DO IT WITH COOKIES

      res.setHeader('Set-Cookie', serialize('access_token', accessToken))
      res.setHeader('Set-Cookie', serialize('refresh_token', refreshToken))

      res.redirect(
        `${process.env.CLIENT_URI}/#${querystring.stringify({
          accessToken,
          refreshToken,
        })}`,
      )
    } catch (error) {
      res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`)
    }
    
  }
}