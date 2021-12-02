import silentNight from '../silent-night-disco.mp3'
import { useEffect, useMemo } from 'react'

const useSong = () => {
  const audio = useMemo(() => new Audio(silentNight))
  useEffect(() => {
    const listener = () => {
      if (audio.paused) {
        audio.play()
      }
    }
    document.addEventListener('mousedown', listener)

    return () => document.removeEventListener('mousedown', listener)
  }, [audio])
}

export default useSong
