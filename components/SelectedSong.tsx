import router from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SmallLoad } from '../components/LoadingScreens'
import { artistHelper, songParams } from '../hooks/songHooks'
import { useAudio } from '../hooks/useAudio'
import { useNewPlaylist } from '../services/NewPlaylistProvider'

const Container = styled.div`
  width: 80%;
  background-color: ${({ theme }: any) => theme.color.background.paper};
  margin: auto;
  margin-top: 70px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  animation: enterplayer 300ms ease-in;
  @media (max-width: 600px) {
    margin: auto;
    padding: 15px;
    flex-direction: row;
    margin-top: 0px;
    background-color: ${({ theme }: any) => theme.color.background.paper};
  }
  @keyframes enterplayer {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
const AlbumImageContainer = styled.img`
  width: 220px;
  height: 220px;
  margin: auto;
  border-radius: 10px;
  @media (max-width: 600px) {
    width: 90px;
    height: 90px;
  }
`
const PlayButton = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 10px;
  border-radius: 100px;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme }: any) => theme.color.background.light};
  transition: 100ms;
  :hover {
  background-color: #363636;
  }
  :active {
  background-color: #272727;
  }
  @media (max-width: 600px) {
    display: none;
  }
`
const PlayIcon = styled.i`
  font-size: 28px;
  margin-right: 5px;
  @media (max-width: 600px) {
    margin: 0px;
  }
`
const SongInfoContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  text-align: center;
  @media (max-width: 600px) {
    height: 100%;
    margin-top: 0px;
    text-align: left;
    margin-left: 10px;
  }
`
const SongName = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 18px;
    font-weight: normal;
    text-align: left;
  }
`
const ArtistContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`
const SongArtists = styled.span`
  font-size: 16px;
  color: #919090;
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 12px;
    font-weight: normal;
  }
  
`
const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: space-around;
  @media (max-width: 600px) {
    display: none;
  }
`
const SpotifyButton = styled.div`
  width: 30%;
  cursor: pointer;
  background-color: #1DB954;
  padding: 7px;
  font-size: 15px;
  text-align: center;
  border-radius: 100px;
  font-weight: bold;
  transition: 200ms;
  :hover {
  background-color: #22db63;
  }
  :active {
  background-color: #19a34a;
  }
  @media (max-width: 600px) {
    width: 120px;
    height: 30px;
    padding: 7px;
    font-size: 13px;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const CreatePlaylistButton = styled.div`
  width: 30%;
  cursor: pointer;
  background: linear-gradient(45deg ,#E93BCC, #3BE9E3);
  padding: 7px;
  font-size: 15px;
  text-align: center;
  border-radius: 100px;
  font-weight: bold;
  transition: 300ms;
  :hover {
    background: linear-gradient(45deg ,#f14bd6, #5cf7f2);
  }
  :active {
    background: linear-gradient(45deg ,#d43fbc, #49ccc8);
  }
  @media (max-width: 600px) {
    width: 120px;
    height: 30px;
    padding: 7px;
    font-size: 13px;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const SmallButtonsContainer = styled.div`
  width: 85%;
  margin: auto;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 601px) {
    display: none;
  }
`
const SmallPlayButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme }: any) => theme.color.background.light};
  transition: 100ms;
  :hover {
  background-color: #363636;
  }
  :active {
  background-color: #272727;
  }
`
const NoSongContainer = styled.div`
  width: 80%;
  height: 55vh;
  background-color: ${({ theme }: any) => theme.color.background.main};
  margin: auto;
  margin-top: 70px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 15px;
  display: flex;
  @media (max-width: 600px) {
    margin: auto;
    padding: 15px;
    height: 13vh;
    margin-top: 0px;
    background-color: ${({ theme }: any) => theme.color.background.paper};
  }
`

const SelectedSong = ({ song, changeSong, token, refreshToken }: any) => {
  
  if (song) {
    const [playing, toggle, stop] = useAudio()
    const [smallLoad, setSmallLoad] = useState(false)
    const { setNewPlaylist }: any = useNewPlaylist()
    const name = song.name.split('(')[0]
    const image = song.album.images[1].url    
    const artists = artistHelper(song.artists)

    const setNewPlaying = () => {
      toggle(song.preview_url)
    }

    const openInSpotify = (url: any) => {
      window.open(url)
    }

    useEffect(() => {
      stop()
      const handleRouteChange = () => {
        stop()
      }
      router.events.on('routeChangeStart', handleRouteChange)
      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }, [changeSong])

    const createPlaylist = async() => {
      setSmallLoad(true)
      try {
        const params = await songParams(song, token)
        const response = await fetch(`/api/new_playlist?access_token=${token}&artist=${params.artists}&track=${params.song}&genres=${params.genres}`)
        const data = await response.json()
        stop()
        data.tracks.push(song)
        setNewPlaylist(data.tracks)
        setSmallLoad(false)
        router.push(`/new-playlist#name=${name}&artist=${artists[0].name}`)
      } catch (error) {
        refreshToken()
      }
    }

    return (
      <>
      <Container>
        <AlbumImageContainer src={image} />
        {song.preview_url == null ? (
          <div></div>
        ) : (
          <PlayButton onClick={setNewPlaying}>
            {playing ? (
              <>
                <PlayIcon className='bx bx-pause'></PlayIcon>
                <span>Pause</span>
              </>
            ) : (
              <>
                <PlayIcon className='bx bx-play'></PlayIcon>
                <span>Play preview</span>
              </>
            )}
          </PlayButton>
        )}
        <SongInfoContainer>
          <SongName>{name}</SongName>
            <ArtistContainer>
              {artists ? (
                artists.map((artist: any, i: number) => (
                  <SongArtists key={i}>{artist}</SongArtists>
                ))
              ) : (
                <span></span>
              )}
            </ArtistContainer>
        </SongInfoContainer>
        <ButtonsContainer>
          <SpotifyButton onClick={() => openInSpotify(song.external_urls.spotify)}>Open in Spotify</SpotifyButton>
          <CreatePlaylistButton onClick={createPlaylist}>Create playlist</CreatePlaylistButton>
        </ButtonsContainer>
      </Container>
      <SmallButtonsContainer>
        {song.preview_url == null ? (
          <div></div>
        ) : (
          <SmallPlayButton onClick={setNewPlaying}>
          {playing ? (
              <PlayIcon className='bx bx-pause'></PlayIcon>
            ) : (
              <PlayIcon className='bx bx-play'></PlayIcon>
            )}
          </SmallPlayButton>
        )}
        <SpotifyButton onClick={() => openInSpotify(song.external_urls.spotify)}>Open in Spotify</SpotifyButton>
        <CreatePlaylistButton onClick={createPlaylist}>Create playlist</CreatePlaylistButton>
      </SmallButtonsContainer>
      {smallLoad ? (
        <SmallLoad />
      ) : (
        <></>
      )}
      </>
    )
  }
  return (
    <>
      <NoSongContainer />
      <SmallButtonsContainer>
        <SmallPlayButton></SmallPlayButton>
        <SpotifyButton></SpotifyButton>
        <CreatePlaylistButton></CreatePlaylistButton>
      </SmallButtonsContainer>
    </>
  )
}

export default SelectedSong