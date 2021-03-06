import { createContext, useContext, useEffect, useState } from 'react'
import { getHashParams } from '../hooks/hashParams'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

export const AuthProvider = ({ children }: any) => {
  // Access token to use in the app
  const [token, setToken]: any = useState(null)
  const router = useRouter()

  // Refresh the access token if it has expired
  const refreshAccessToken = async() => {
    try {
      const localRefreshToken = localStorage.getItem('refresh_token')
      const response = await fetch(`${process.env.CLIENT_URI}/api/refresh_token?refresh_token=${localRefreshToken}`)
      const accessToken = await response.json()
      localStorage.setItem('access_token', accessToken.token)
      setToken(accessToken.token)
      router.reload()
      return
    } catch (error) {
      console.error(error)
    }
  }

  const getFromLocal = async() => {
    const localAccessToken = localStorage.getItem('access_token')
    const localRefreshToken = localStorage.getItem('refresh_token')

    if (localAccessToken || localRefreshToken) {
      return localAccessToken
    } else {
      return null
    }
  }

  const getAccessToken = async() => {
    // Retrieve access and refresh token from the callback
    const { accessToken, refreshToken, error }: any = getHashParams()

    if (error) {
      console.warn(error)
      refreshAccessToken()
    }

    // Save tokens in localStorage
    if (accessToken || refreshToken) {
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      setToken(accessToken)
    } else {
      // Retrieve saved tokens
      const localToken = await getFromLocal()
      setToken(localToken)
    }
  }

  const logOut = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.replace(`${process.env.CLIENT_URI}`)
    router.reload()
  }

  useEffect(() => {
    getAccessToken()
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken, logOut, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)