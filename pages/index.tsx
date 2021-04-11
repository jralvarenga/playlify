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
  flex-flow: column;
  height: 100vh;
  overflow-y: hidden;
`
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  height: 100%;
`
const SongsContainer = styled.div`
  width: 80%;
  height: 100%;
  flex-direction: column;
  @media (max-width: 600px) {
    width: 85%;
  }
`
const MenuContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  border-right: 2px solid ${({ theme }: any) => theme.color.background.paper};
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 600px) {
    width: 15%;
  }
`
const MenuItemActive = styled.div`
  width: 100%;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
  background-color: #58144d;
  padding: 5px;
  text-align: center;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  transition: 300ms;
  display: flex;
  align-items: center;
`
const MenuItem = styled.div`
  width: 100%;
  height: 50px;
  font-size: 18px;
  color: ${({ theme }: any) => theme.text.paper};
  cursor: pointer;
  padding: 5px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  transition: 300ms;
  display: flex;
  align-items: center;
  :hover {
    background-color: ${({ theme }: any) => theme.color.background.light};
  }
  :active {
    background-color: ${({ theme }: any) => theme.color.background.paper};
  }
  @media (max-width: 600px) {
    width: 100%;
    font-size: 16px;
  }
`
const MenuText = styled.span`
  text-align: center;
  font-size: 18px;
  @media (max-width: 600px) {
    display: none;
  }
`
const MenuIcon = styled.i`
  margin-left: 15px;
  margin-right: 15px;
  @media (max-width: 600px) {
    margin: auto;
  }
`
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`
const SearchInput = styled.input`
  width: 350px;
  padding: 7px;
  margin-left: 3%;
  border: 0px;
  border-radius: 15px;
  font-family: 'poppins';
  background-color: ${({ theme }: any) => theme.color.background.paper};
  color: ${({ theme }: any) => theme.text.color};
  font-size: 22px;
  font-weight: bold;
  box-shadow: 2px 2px 2px 2px #141414;
`
const SearchIcon = styled.i`
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 28px;
  background-color: ${({ theme }: any) => theme.color.background.light};
  margin-left: 5px;
  :hover {
  background-color: #363636;
  }
  :active {
  background-color: #272727;
  }
  @media (max-width: 600px) {
    font-size: 25px;
  }
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
        setViewLibrary('search')
        setSongs(null)
        setSearchSong(true)
        setTimeout(() => {
          searchInput.current.focus()
        }, 100)
      break;
      default:
        setSearchSong(false)
        setSongs(allPlaylists.liked)
        setViewLibrary('liked')
      break;
    }
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
    token ? (
      loading ? (
        <LoadingScreen />
      ) : (
        <Container>

        <NavBar
          profilePic={profilePic}
          uri={profile.uri}
        />
        <AppContainer>
          <MenuContainer>
            {viewLibrary == "search" ? (
              <MenuItemActive><MenuIcon className='bx bx-search' /><MenuText>Search</MenuText></MenuItemActive>
            ) : (
              <MenuItem onClick={() => changeSongs('search')}><MenuIcon className='bx bx-search' /><MenuText>Search</MenuText></MenuItem>
            )}
            {viewLibrary == "liked" ? (
              <MenuItemActive><MenuIcon className='bx bxs-heart' /><MenuText>Liked Songs</MenuText></MenuItemActive>
            ) : (
              <MenuItem onClick={() => changeSongs('liked')}><MenuIcon className='bx bxs-heart' /><MenuText>Liked Songs</MenuText></MenuItem>
            )}
            {viewLibrary == "recent" ? (
              <MenuItemActive><MenuIcon className='bx bx-time-five' /><MenuText>Recent Songs</MenuText></MenuItemActive>
            ) : (
              <MenuItem onClick={() => changeSongs('recent')}><MenuIcon className='bx bx-time-five' /><MenuText>Recent Songs</MenuText></MenuItem>
            )}
            {viewLibrary == "top" ? (
              <MenuItemActive><MenuIcon className='bx bxs-star' /><MenuText>Top Songs</MenuText></MenuItemActive>
            ) : (
              <MenuItem onClick={() => changeSongs('top')}><MenuIcon className='bx bxs-star' /><MenuText>Top Songs</MenuText></MenuItem>
            )}
          </MenuContainer>
          <SongsContainer>
            {searchSong ? (
              <SearchContainer>
                <SearchInput
                  ref={searchInput}
                  type="text"
                  placeholder="Search a song"
                  value={searchName}
                  onBlur={searchSongHandler}
                  onChange={(e: any) => setSearchName(e.target.value)}
                  onKeyDown={handleEnterKey}
                />
                <SearchIcon onClick={searchSongHandler} className='bx bx-search' />
              </SearchContainer>
            ) : (
              <></>
            )}
            <DisplaySongs
              type={viewLibrary}
              songs={songs}
              playSongHandler={playSongHandler}
            />
          </SongsContainer>
        </AppContainer>
        <SelectedSong
          song={selectedSong}
          changeSong={changeSong}
          token={token}
          refreshToken={refreshAccessToken}
        />
        {smallLoad ? (
          <SmallLoad />
        ) : (
          <></>
        )}
        </Container>
      )
    ) : (
      <LoginScreen />
    )
  )
}

export default Home
