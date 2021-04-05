import { useEffect, useState } from 'react'
import styled from 'styled-components'
import DisplaySongs from '../components/DisplaySongs'
import LoginScreen from '../components/LoginScreen'
import { LoadingScreen } from '../components/LoadingScreens'
import NavBar from '../components/NavBar'
import SelectedSong from '../components/SelectedSong'
import { useAuth } from '../services/AuthProvider'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`
const SongsContainer = styled.div`
  width: 55%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  height: 75vh;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const SelectedSongContainer = styled.div`
  width: 45%;
  margin-top: 30px;
  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 0px;
  }
`
const SongsListContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  @media (max-width: 600px) {
    width: 80%;
  }
`
const FullListButton = styled.div`
  width: 120px;
  cursor: pointer;
  border: 2px solid #E93BCC;
  background-color: #E93BCC;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  border-radius: 100px;
  transition: 300ms;
  margin-left: 10px;
  :hover {
    background: #f14bd6;
  }
  :active {
    background: #d43fbc
  }
  @media (max-width: 600px) {
    width: 100px;
    font-size: 12px;
  }
`
const LineListButton = styled.div`
  width: 120px;
  cursor: pointer;
  border: 2px solid #E93BCC;
  padding: 5px;
  font-size: 14px;
  margin-left: 10px;
  text-align: center;
  border-radius: 100px;
  transition: 300ms;
  :hover {
    background: #f14bd6;
  }
  :active {
    background: #d43fbc
  }
  @media (max-width: 600px) {
    width: 100px;
    font-size: 12px;
  }
`

const Home = () => {
  const { token, refreshAccessToken }: any = useAuth()
  const [loading, setLoading] = useState(true)
  const [profilePic, seProfilePic]: any = useState(null)
  const [viewLibrary, setViewLibrary] = useState('liked')
  const [allSongs, setAllSongs]: any = useState({})
  const [songs, setSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [changeSong, setChangeSong] = useState(0)
  
  const getUserProfile = async() => {
    if (token) {
      try {
        const response  = await fetch(`/api/current_user?access_token=${token}`)
        const data = await response.json()
        //setUserProfile(data)
        const profilePic = data.images[0].url
        seProfilePic(profilePic)
      } catch (error) {
        refreshAccessToken()
      }
    }
  }

  const getSongs = async() => {
    if (token) {
      try {
        const responseLiked = await fetch(`/api/liked_songs?access_token=${token}`)
        const likedSongs = await responseLiked.json()
        const responseRecent = await fetch(`/api/recent_played?access_token=${token}`)
        const recentPlayed = await responseRecent.json()
        const responseTop = await fetch(`/api/top_tracks?access_token=${token}`)
        const topSongs = await responseTop.json()

        setAllSongs({
          liked: likedSongs.items,
          recent: recentPlayed.items,
          top: topSongs.items
        })
        setViewLibrary('liked')
        setSongs(likedSongs.items)
        setLoading(false)
      } catch (error) {
        refreshAccessToken()
      }
    }
  }

  useEffect(() => {
    const loadPage = async() => {
      await getUserProfile()
      await getSongs()
    }
    loadPage()
  }, [token])

  const changeSongs = (type: string) => {
    switch (type) {
      case 'liked':
        setSongs(allSongs.liked)
        setViewLibrary('liked')
      break;
      case 'recent':
        setViewLibrary('recent')
        setSongs(allSongs.recent)
      break;
      case 'top':
        setViewLibrary('top')
        setSongs(allSongs.top)
      break;
    
      default:
        setSongs(allSongs.liked)
        setViewLibrary('liked')
      break;
    }
  }

  const playSongHandler = (song: any) => {
    setChangeSong(changeSong + 1)
    setSelectedSong(song)
  }

  return (
    <div>
      {token ? (
        loading ? (
          <LoadingScreen />
        ) : (
          <div>
            <NavBar
              profilePic={profilePic}
            />
            <Container>
              <SongsContainer>
                <SongsListContainer>
                  {viewLibrary == 'liked' ? (
                    <FullListButton>Liked songs</FullListButton>
                  ) : (
                    <LineListButton onClick={() => changeSongs('liked')}>Liked songs</LineListButton>  
                  )}
                  {viewLibrary == 'recent' ? (
                    <FullListButton>Recent songs</FullListButton>
                  ) : (
                    <LineListButton onClick={() => changeSongs('recent')}>Recent songs</LineListButton>  
                  )}
                  {viewLibrary == 'top' ? (
                    <FullListButton>Top songs</FullListButton>
                  ) : (
                    <LineListButton onClick={() => changeSongs('top')}>Top songs</LineListButton>  
                  )}
                </SongsListContainer>
                <DisplaySongs
                  type={viewLibrary}
                  songs={songs}
                  playSongHandler={playSongHandler}
                />
              </SongsContainer>
              <SelectedSongContainer>
                <SelectedSong
                  song={selectedSong}
                  changeSong={changeSong}
                  token={token}
                  refreshToken={refreshAccessToken}
                />
              </SelectedSongContainer>
            </Container>
          </div>
        )
      ) : (
        <LoginScreen />
      )}
    </div>
  )
}

export default Home
