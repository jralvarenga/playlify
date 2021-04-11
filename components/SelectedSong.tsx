import router from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SmallLoad } from '../components/LoadingScreens'
import { artistHelper, songParams } from '../hooks/songHooks'
import { useAudio } from '../hooks/useAudio'
import { useNewPlaylist } from '../services/NewPlaylistProvider'

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }: any) => theme.color.background.paper};
  margin: auto;
  position: fixed;
  padding-top: 15px;
  padding-bottom: 15px;
  bottom: 0;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
`
const AlbumImageContainer = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 15px;
  border-radius: 10px;
`
const PlayIcon = styled.i`
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 28px;
  background-color: ${({ theme }: any) => theme.color.background.light};
  margin-right: 5px;
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
const SongInfoContainer = styled.div`
  width: auto;
  margin-left: 20px;
  @media (max-width: 600px) {
    margin-left: 10px;
  }
`
const SongName = styled.span`
  font-size: 20px;
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
  font-size: 14px;
  color: #919090;
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 12px;
    font-weight: normal;
    text-align: left;
  }
`
const ButtonsContainer = styled.div`
  width: 200px;
  display: flex;
  margin-left: auto;
  margin-right: 40px;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 600px) {
    margin-right: 10px;
  }
`
const SpotifyButton = styled.i`
  padding: 10px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  background-color: #1DB954;
  margin-right: 5px;
  transition: 200ms;
  :hover {
  background-color: #22db63;
  }
  :active {
  background-color: #19a34a;
  }
  @media (max-width: 600px) {
    font-size: 25px;
  }
`
const CreatePlaylistButton = styled.div`
  padding: 10px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  background: linear-gradient(45deg ,#E93BCC, #3BE9E3);
  transition: 300ms;
  :hover {
    background: linear-gradient(45deg ,#f14bd6, #5cf7f2);
  }
  :active {
    background: linear-gradient(45deg ,#d43fbc, #49ccc8);
  }
  @media (max-width: 600px) {
    font-size: 25px;
  }
`
const NoSongContainer = styled.div`
  width: 60px;
  height: 60px;
  margin-left: 15px;
  border-radius: 10px;
`
const NoSongIcon = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }: any) => theme.color.background.light};
`

const SelectedSong = ({ song, changeSong, token, refreshToken }: any) => {
  
  if (song) {
    const [playing, toggle, stop] = useAudio()
    const [smallLoad, setSmallLoad] = useState(false)
    const { setNewPlaylist, setBasedSong }: any = useNewPlaylist()
    const name = song.name.split('(')[0]
    const image = song.album.images[1].url
    const artists = artistHelper(song.artists)

    const setNewPlaying = () => {
      toggle(song.preview_url)
    }

    useEffect(() => {
      stop()
      const handleRouteChange = () => {
        stop()
      }

      // If return to home, pause the music
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
        setBasedSong(song)
        router.push(`/new-playlist#name=${name}&artist=${artists[0].name}`)
      } catch (error) {
        refreshToken()
      }
    }

    return (
      <>
      <Container>
        <AlbumImageContainer src={image} />
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
          {song.preview_url == null ? (
            <div></div>
          ) : (
            playing ? (
              <PlayIcon onClick={setNewPlaying} className='bx bx-pause'></PlayIcon>
            ) : (
              <PlayIcon onClick={setNewPlaying} className='bx bx-play'></PlayIcon>
            )
          )}
          <SpotifyButton className='bx bxl-spotify' onClick={() => window.open(song.external_urls.spotify)} />
          <CreatePlaylistButton className='bx bxs-playlist' onClick={createPlaylist} />
        </ButtonsContainer>
      </Container>
      {smallLoad ? (
        <SmallLoad />
      ) : (
        <></>
      )}
      </>
    )
  }
  return (
    <Container>
      <NoSongContainer />
      <ButtonsContainer>
        <NoSongIcon />
        <NoSongIcon />
        <NoSongIcon />
      </ButtonsContainer>
    </Container>
  )
}

export default SelectedSong