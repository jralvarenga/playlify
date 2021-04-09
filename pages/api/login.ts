import querystring from 'querystring';
import { serialize } from 'cookie'

const generateRandomString = function (length: any) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default function handler(req: any, res: any) {
  console.log(req)

  // Generate a temporal random state for verification and to send it to the spotify API
  const state = generateRandomString(16);
  res.setHeader('Set-Cookie', serialize('auth_state', state));

  // Scopes for login the user
  const scopes = 'user-read-recently-played user-top-read playlist-modify-public playlist-modify-private user-library-read user-read-private user-read-email'

  // Redirect to the spotify login
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scopes,
      redirect_uri: process.env.REDIRECT_URI,
      state: state
    })}`,
  );
}