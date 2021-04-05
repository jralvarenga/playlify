import router from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../services/AuthProvider'
import { useNewPlaylist } from '../services/NewPlaylistProvider'
import NavBar from '../components/NavBar'
import DisplaySongs from '../components/DisplaySongs'
import SelectedSong from '../components/SelectedSong'
import styled from 'styled-components'
import { getHashParams } from '../hooks/hashParams'
import { playlistInfo } from '../hooks/playlistInfo'

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
    margin-bottom: 0px;
  }
`
const SelectedSongContainer = styled.div`
  width: 45%;
  margin-top: 30px;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const PlaylistTitle = styled.div`
  width: 100%;
  height: 60px;
  flex-direction: row;
  margin-bottom: 15px;
`
const PlaylistName = styled.div`
  width: 100%;
  margin-left: 3%;
  border: 0px;
  font-family: 'poppins';
  color: ${({ theme }: any) => theme.text.color};
  font-size: 30px;
  font-weight: bold;
  background-color: inherit;
  @media (max-width: 600px) {
    font-size: 24px;
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

const NewPlaylist = () => {
  const { token, refreshAccessToken }: any = useAuth()
  const [uri, setUri] = useState(null)

  if (token == null) {
    return <div></div>
  }
  
  const basedName = getHashParams()
  const [profilePic, seProfilePic] = useState(null)
  const { newPlaylist }: any = useNewPlaylist()
  const playlist = playlistInfo(newPlaylist, basedName)
  const [selectedSong, setSelectedSong] = useState(null)
  const [changeSong, setChangeSong] = useState(0)

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

  return (
    <div>
      <NavBar
        profilePic={profilePic}
      />
      <Container>
        <SongsContainer>
          <PlaylistTitle>
            <PlaylistName>{playlist.name}</PlaylistName>
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
            type="top"
            songs={newPlaylist}
            playSongHandler={playSongHandler}
          />
        </SongsContainer>
        <SelectedSongContainer>
          <SelectedSong
            song={selectedSong}
            changeSong={changeSong}
            token={token}
          />
        </SelectedSongContainer>
      </Container>
    </div>
  )
}

export default NewPlaylist