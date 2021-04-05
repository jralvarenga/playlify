export const songParams = async(song: any, token: any) => {

  const artists = song.artists.map((artist: any, i: number) => {
    if (i == 4) {
      return
    } else {
      const id = artist.uri
      const split = id.split(':')
      const uri = split[2]
      return uri
    }
  })
  //const artistString = artists.join(',')

  const songId = song.uri
  const songUri = songId.split(':')[2]

  const responseArtist = await fetch(`/api/get_artist?access_token=${token}&id=${artists[0]}`)
  const artist = await responseArtist.json()

  const genres = artist.genres.map((genre: any) => {
    const replace = genre.replace(' ', '_')
    return replace
  })
  //const genresString = genres.join(',')

  const params = {
    artists: artists[0],
    song: songUri,
    genres: genres[0]
  }

  return params
}