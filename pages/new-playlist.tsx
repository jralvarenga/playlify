import router from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../services/AuthProvider'
import { useNewPlaylist } from '../services/NewPlaylistProvider'
import { SmallLoad } from '../components/LoadingScreens'
import NavBar from '../components/NavBar'
import DisplaySongs from '../components/DisplaySongs'
import SelectedSong from '../components/SelectedSong'
import styled from 'styled-components'
import { getHashParams } from '../hooks/hashParams'
import { playlistInfo } from '../hooks/playlistInfo'
import { artistHelper, songParams } from '../hooks/songHooks'

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
  @media (max-width: 600px) {
    margin-top: 25px;
  }
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
const MenuItem = styled.div`
  width: 100%;
  height: 50px;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: ${({ theme }: any) => theme.color.background.paper};
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
    font-size: 20px;
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
const PlaylistTitle = styled.div`
  width: 100%;
  flex-direction: row;
`
const PlaylistName = styled.div`
  width: auto;
  margin-right: 40px;
  margin-left: 3%;
  border: 0px;
  font-family: 'poppins';
  color: ${({ theme }: any) => theme.text.color};
  font-size: 30px;
  font-weight: bold;
  background-color: inherit;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 24px;
    width: auto;
    margin-right: 20px;
  }
`
const PlaylistData = styled.div`
  font-size: 16px;
  color: #919090;
  margin-left: 3%;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`
const Separator = styled.span`
  width: 5px;
  height: 5px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background-color:#919090;
  @media (max-width: 600px) {
    margin-left: 5px;
    margin-right: 5px;
  }
`
const SavePlaylistButton = styled.div`
  width: 100px;
  margin-left: 30px;
  cursor: pointer;
  background: linear-gradient(45deg ,#E93BCC, #3BE9E3);
  padding: 5px;
  font-size: 15px;
  text-align: center;
  border-radius: 100px;
  color: ${({ theme }: any) => theme.text.color};
  font-weight: bold;
  transition: 300ms;
  :hover {
    background: linear-gradient(45deg ,#f14bd6, #5cf7f2);
  }
  :active {
    background: linear-gradient(45deg ,#d43fbc, #49ccc8);
  }
  @media (max-width: 600px) {
    width: 80px;
    margin-left: 15px;
    font-size: 13px;
  }
`
const PlaylistNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
const IconContainer = styled.i`
  padding: 12px;
  border-radius: 50%;
  background-color: ${({ theme }: any) => theme.color.background.paper};
  font-size: 20px;
  cursor: pointer;
  transition: 300ms;
  margin-left: 15px;
  :hover {
    background-color: ${({ theme }: any) => theme.color.background.light};
  }
`
const PlaylistNameChange = styled.input`
  width: 100%;
  margin-left: 3%;
  border: 0px;
  font-family: 'poppins';
  color: ${({ theme }: any) => theme.text.color};
  font-size: 30px;
  font-weight: bold;
  background-color: inherit;
  @media (max-width: 600px) {
    width: 90%;
    font-size: 24px;
    margin-bottom: 10px;
  }
`

const NewPlaylist = () => {
  // Token and user info
  const { token, refreshAccessToken }: any = useAuth()
  const [profilePic, seProfilePic] = useState(null)
  const [uri, setUri] = useState(null)
  const [smallLoad, setSmallLoad] = useState(false)
  // If not log in return to home
  if (token == null) {
    return <div></div>
  }
  // Get song name from hash params and playlist info
  const basedName = getHashParams()
  const { newPlaylist, setNewPlaylist , basedSong }: any = useNewPlaylist()
  const [playlist, setPlaylist] = useState(playlistInfo(newPlaylist, basedName))
  const [selectedSong, setSelectedSong] = useState(null)
  const [changeSong, setChangeSong] = useState(0)
  const [changeName, setChangeName] = useState(false)
  const [newName, setNewName] = useState("")
  const inputRef: any = useRef(null)

  const getUserProfile = async() => {
    if (token) {
      try {
        const response  = await fetch(`/api/current_user?access_token=${token}`)
        const data = await response.json()
        setUri(data.uri)
        const profilePic = data.images[0].url
        seProfilePic(profilePic)
      } catch (error) {
        refreshAccessToken()
      }
    }
  }

  useEffect(() => {    
    if (newPlaylist == null) {
      router.push('/')
    }
    getUserProfile()
  })

  const playSongHandler = (song: any) => {
    setChangeSong(changeSong + 1)
    setSelectedSong(song)
  }

  const savePlaylist = async() => {
    const playlistData = {
      name: playlist.name,
      description: `${playlist.name} ${playlist.artist}`,
      userId: uri,
      items: newPlaylist
    }
    try {
      const response = await fetch(`/api/save_playlist?access_token=${token}`, {
        method: 'post',
        body: JSON.stringify(playlistData)
      })
      const data = await response.json()
      window.open(data.external_urls.spotify)
    } catch (error) {
      refreshAccessToken()
    }
  }

  const refreshPlaylist = async() => {
    setSmallLoad(true)
    const name = basedSong.name.split('(')[0]
    const artists = artistHelper(basedSong.artists)
    try {
      const params = await songParams(basedSong, token)
      const response = await fetch(`/api/new_playlist?access_token=${token}&artist=${params.artists}&track=${params.song}&genres=${params.genres}`)
      const data = await response.json()
      stop()
      data.tracks.push(basedSong)
      setNewPlaylist(data.tracks)
      setSmallLoad(false)
      router.push(`/new-playlist#name=${name}&artist=${artists[0].name}`)
    } catch (error) {
      refreshAccessToken()
    }
  }

  const changeNameStart = () => {
    setChangeName(true)
    setTimeout(() => {
      inputRef.current.focus()
    }, 100)
  }

  const changePlaylistName = () => {
    if (newName != "") {
      playlist.name = newName
      setPlaylist(playlist)
      setNewName("")
      setChangeName(false) 
    }
    setChangeName(false)
  }

  const handleEnterKey = (e: any) => {
    if (e.key === 'Enter') {
      changePlaylistName()
    }
  }

  const deleteFromPlaylist = (uri: any) => {
    const library: string[] = newPlaylist.map((song: any) => song.uri)
    const remove = library.indexOf(uri)
    newPlaylist.splice(remove, 1)
    const newInfo = playlistInfo(newPlaylist, basedName)
    setNewPlaylist(newPlaylist)
    setPlaylist(newInfo)
  }

  return (
    <Container>
      <NavBar
        profilePic={profilePic}
        uri={uri}
      />
      <AppContainer>
      <MenuContainer>
          <MenuItem onClick={refreshPlaylist}><MenuIcon className='bx bx-refresh' /><MenuText>Refresh playlist</MenuText></MenuItem>
          <MenuItem onClick={() => router.push('/')}><MenuIcon className='bx bxs-home' /><MenuText>Go home</MenuText></MenuItem>
        </MenuContainer>
        <SongsContainer>
          <PlaylistTitle>
            {!changeName ? (
              <PlaylistNameContainer>
                <PlaylistName onDoubleClick={changeNameStart}>{playlist.name}</PlaylistName>
                <IconContainer className='bx bxs-edit-alt' onClick={changeNameStart} />
              </PlaylistNameContainer>
            ) : (
              <PlaylistNameChange
                type="text"
                onBlur={changePlaylistName}
                placeholder={playlist.name}
                ref={inputRef}
                value={newName}
                onKeyDown={handleEnterKey}
                onChange={(e: any) => setNewName(e.target.value)}
              />
            )}
            <PlaylistData>
              <span>{playlist.artist}</span>
              <Separator />
              <span>{playlist.duration}</span>
              <Separator />
              <span>{playlist.amount} songs</span>
              <SavePlaylistButton onClick={savePlaylist}>Save</SavePlaylistButton>
            </PlaylistData>
          </PlaylistTitle>
          <DisplaySongs
            type="playlist"
            songs={newPlaylist}
            playSongHandler={playSongHandler}
            deleteFromPlaylist={deleteFromPlaylist}
          />
        </SongsContainer>
      </AppContainer>
      <SelectedSong
        song={selectedSong}
        changeSong={changeSong}
        token={token}
      />
      {smallLoad ? (
        <SmallLoad />
      ) : (
        <></>
      )}
    </Container>
  )
}

export default NewPlaylist