import styled from "styled-components"

const Container = styled.div`
  width: 90%;
  margin: auto;
  height: 100%;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: ${({ theme }: any) => theme.color.background.paper};
  overflow-y: scroll;
  @media (max-width: 600px) {
    width: 80%;
  }
`
const SongContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  border-top: 1px solid #3b3b3b;
  border-bottom: 1px solid #3b3b3b;
  border-radius: 10px;
  transition: 200ms;
  cursor: pointer;
  :first-child {
    border-top: 0px;
  }
  :last-child {
    border-bottom: 0px;
  }
  :hover {
    background-color: #353535;
  }
  :active {
    background-color: #1b1b1b;
  }
`
const AlbumImageContainer = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 10px;
  margin-left: 5px;
`
const SongInfoContainer = styled.div`
`
const SongName = styled.span`
  font-size: 18px;
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`
const SongArtists = styled.span`
  font-size: 14px;
  color: #686868;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`

const DisplaySongs = ({ songs, type, playSongHandler }: any) => {

  if (songs == null) {
    return (<Container />)
  }

  return (
    <Container>
      {type == 'top' || type == 'search' ? (
        songs.map((song: any, i: number) => {
          const track = song  
          const name = track.name.split('(')[0]
          const image = track.album.images[1].url
          const artists = track.artists
          return (
            <SongContainer onClick={() => playSongHandler(track)} key={i}>
              <AlbumImageContainer src={image} />
              <SongInfoContainer>
                <SongName>{name}</SongName>
                <br/>
                {artists ? (
                  artists.map((artist: any, i: number) => (
                    <SongArtists key={i}>{artist.name}, </SongArtists>
                  ))
                ) : (
                  <span></span>
                )}
              </SongInfoContainer>            
            </SongContainer>
          )
        })
      ) : (
        songs.map((song: any, i: number) => {
          const track = song.track
          const name = track.name.split('(')[0]
          const image = track.album.images[1].url
          const artists = track.artists
          return (
            <SongContainer onClick={() => playSongHandler(track)} key={i}>
              <AlbumImageContainer src={image} />
              <SongInfoContainer>
                <SongName>{name}</SongName>
                <br/>
                {artists ? (
                  artists.map((artist: any, i: number) => (
                    <SongArtists key={i}>{artist.name}, </SongArtists>
                  ))
                ) : (
                  <span></span>
                )}
              </SongInfoContainer>            
            </SongContainer>
          )
        })
      )}
    </Container>
  )
}

export default DisplaySongs