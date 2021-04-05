const convertMs = (ms: number) => {
  const minutes: number = Math.floor(ms / 60000)
  //const seconds: any = ((ms % 60000) / 1000).toFixed(0)
  const hours = Math.floor(minutes / 60)
  const min = minutes - (hours * 60)
  if (hours > 0) {
    return `${hours}h ${min}min `
  } else {
    return `${min} min`
  }
  //return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}

export const playlistInfo = (playlist: any, basedName: any) => {
  const durations: number[] = playlist.map((song: any) => song.duration_ms)
  const totalDuration: number = durations.reduce((acc, crr) => acc + crr)
  const convertToMin = convertMs(totalDuration)

  const amount = playlist.length

  const name = `Based on ${basedName.name}`
  const artist = `By ${basedName.artist}`

  const info = {
    duration: convertToMin,
    amount: amount,
    name: name,
    artist: artist
  }
  return info
}