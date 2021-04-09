import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import DisplaySongs from '../components/DisplaySongs'
import LoginScreen from '../components/LoginScreen'
import { LoadingScreen, SmallLoad } from '../components/LoadingScreens'
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
    width: 90%;
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
const IconButton = styled.i`
  padding: 12px;
  border-radius: 50%;
  background-color: ${({ theme }: any) => theme.color.background.paper};
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
  transition: 300ms;
  :hover {
    background-color: ${({ theme }: any) => theme.color.background.light};
  }
`
const FullIconButton = styled.i`
  padding: 12px;
  border-radius: 50%;
  background-color: ${({ theme }: any) => theme.color.primary.main};
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
  transition: 300ms;
  :hover {
    background-color: ${({ theme }: any) => theme.color.primary.light};
  }
`
const SearchInput = styled.input`
  width: 70%;
  padding: 7px;
  margin-left: 3%;
  margin-top: 15px;
  border: 0px;
  border-radius: 15px;
  font-family: 'poppins';
  background-color: ${({ theme }: any) => theme.color.background.paper};
  color: ${({ theme }: any) => theme.text.color};
  font-size: 22px;
  font-weight: bold;
  box-shadow: 2px 2px 2px 2px #141414;
`

const Home = () => {
  // Token and user info
  const { token, refreshAccessToken }: any = useAuth()
  const [loading, setLoading] = useState(true)
  const [smallLoad, setSmallLoad] = useState(false)
  const [profile, setProfile]: any = useState({})
  const [profilePic, seProfilePic]: any = useState(null)

  // Current display playlist
  const [viewLibrary, setViewLibrary] = useState('liked')

  // All playlist from user
  const [allPlaylists, setAllPlaylists]: any = useState({})

  // Songs from playlist to display 
  const [songs, setSongs]: any = useState([])

  // Selected song from user
  const [selectedSong, setSelectedSong] = useState(null)

  // Manage state from changed playlist
  const [changeSong, setChangeSong] = useState(0)

  const [searchSong, setSearchSong] = useState(false)
  const [searchName, setSearchName] = useState("")
  const searchInput: any = useRef(null)
  
  const getUserProfile = async() => {
    if (token) {
      try {
        const response = await fetch(`/api/current_user?access_token=${token}`)
        const data = await response.json()
        setProfile(data)
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

        setAllPlaylists({
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
    // Retrieve all the user info and playlist
    const loadPage = async() => {
      await getUserProfile()
      await getSongs()
    }
    loadPage()
    if (searchSong) {
      setSearchSong(false)
    }
  }, [token])

  const changeSongs = (type: string) => {
    switch (type) {
      case 'liked':
        setSearchSong(false)
        setSongs(allPlaylists.liked)
        setViewLibrary('liked')
      break;
      case 'recent':
        setSearchSong(false)
        setViewLibrary('recent')
        setSongs(allPlaylists.recent)
      break;
      case 'top':
        setSearchSong(false)
        setViewLibrary('top')
        setSongs(allPlaylists.top)
      break;
      case 'search':
      break;
      default:
        setSearchSong(false)
        setSongs(allPlaylists.liked)
        setViewLibrary('liked')
      break;
    }
  }

  const searchSongInputHandler = () => {
    setViewLibrary('search')
    setSongs(null)
    setSearchSong(true)
    setTimeout(() => {
      searchInput.current.focus()
    }, 100)
  }

  const playSongHandler = (song: any) => {
    setChangeSong(changeSong + 1)
    setSelectedSong(song)
  }

  const searchSongHandler = async() =>{
    if (searchName != "") {
      setSmallLoad(true)
      setViewLibrary('search')
      const response = await fetch(`/api/search_song?access_token=${token}&query=${searchName}`)
      setSearchName("")
      const data = await response.json()
      setSongs(data.tracks.items)
      setSmallLoad(false)
    }
  }

  const handleEnterKey = (e: any) => {
    if (e.key === 'Enter') {
      searchSongHandler()
    }
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
              uri={profile.uri}
            />
            <Container>
              <SongsContainer>
                <SongsListContainer>
                  {viewLibrary == "liked" ? (
                    <FullListButton>Liked songs</FullListButton>
                  ) : (
                    <LineListButton onClick={() => changeSongs('liked')}>Liked songs</LineListButton>  
                  )}
                  {viewLibrary == "recent" ? (
                    <FullListButton>Recent songs</FullListButton>
                  ) : (
                    <LineListButton onClick={() => changeSongs('recent')}>Recent songs</LineListButton>  
                  )}
                  {viewLibrary == "top" ? (
                    <FullListButton>Top songs</FullListButton>
                  ) : (
                    <LineListButton onClick={() => changeSongs('top')}>Top songs</LineListButton>  
                  )}
                  {viewLibrary == "search" ? (
                    <FullIconButton className='bx bx-search' />
                  ) : (
                    <IconButton className='bx bx-search' onClick={searchSongInputHandler} /> 
                  )}
                </SongsListContainer>
                {searchSong ? (
                  <SearchInput
                    ref={searchInput}
                    type="text"
                    placeholder="Search a song"
                    value={searchName}
                    onBlur={searchSongHandler}
                    onChange={(e: any) => setSearchName(e.target.value)}
                    onKeyDown={handleEnterKey}
                  />
                ) : (
                  <></>
                )}
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
            {smallLoad ? (
              <SmallLoad />
            ) : (
              <></>
            )}
          </div>
        )
      ) : (
        <LoginScreen />
      )}
    </div>
  )
}

export default Home
