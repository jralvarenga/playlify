import { useState, useEffect } from 'react'

export const useAudio = () => {
  const [audio, setAudio] = useState(new Audio(''))
  const [playing, setPlaying] = useState(false)

  const toggle: any = (url: any) => {
    audio.pause()
    setAudio(new Audio(url))
    setPlaying(!playing)
  }

  const stop = () => {
    audio.pause()
    setPlaying(false)
    setAudio(new Audio(''))
  }

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  useEffect(() => {
    audio.addEventListener('ended', () => {
      audio.pause()
      setPlaying(false)
    })
    return () => {
      audio.removeEventListener('ended', () => {
        audio.pause()
        setPlaying(false)
      })
    }
  }, [])

  return [playing, toggle, stop]
}