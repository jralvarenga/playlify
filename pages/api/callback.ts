import querystring from 'querystring'
import { serialize } from 'cookie'

// Callback for the spotify login
export default async function handler(req: any, res: any) {
  const code = req.query.code || null
  const state = req.query.state || null
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET

  // Retrieve the temporal state
  const storedState = req.cookies ? req.cookies['auth_state'] : null

  // Verify the temporal state with the state provided by the spotify API
  if (state === null || state !== storedState) {

    // State doesn't match
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`)
  } else {

    // Delete the temporal state from the cookies
    res.setHeader('Set-Cookie', [
      serialize('auth_state', '', {
        maxAge: -1,
        path: '/',
      })
    ])
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    try {
      // Call to get the access and refresh token
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
      
      // Send it on the front end to manage the auth service
      res.redirect(
        `${process.env.CLIENT_URI}/#${querystring.stringify({
          accessToken,
          refreshToken,
        })}`,
      )
    } catch (error) {
      
      // The clientId or clientSecret is incorrect
      res.redirect(`/#${querystring.stringify({ error: 'invalid_secrets' })}`)
    }
    
  }
}