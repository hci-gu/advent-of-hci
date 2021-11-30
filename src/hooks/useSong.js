import silentNight from '../silent-night-disco.mp3'
import { useEffect } from 'react'

const useSong = () => {
  useEffect(() => {
    const audio = new Audio(silentNight)
    audio.play()
  }, [])
}

export default useSong
