const withPWA = require('next-pwa')

module.exports = withPWA({
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    CLIENT_URI: process.env.CLIENT_URI
  },
  pwa: {
    dest: 'public'
  }
})