import { useMemo } from 'react'
import { io } from 'socket.io-client'
import { useAtom } from 'jotai'
import { setOpenedAtom } from '../state'
const API_URL = import.meta.env.VITE_API_URL

const useSocket = () => {
  const [_, setOpened] = useAtom(setOpenedAtom)
  const socket = useMemo(() => {
    const s = io(`${API_URL}`, { transports: ['websocket'] })
    s.on('connect', () => {
      console.log('socket connected')
    })
    s.on('open', (data) => {
      const index = parseInt(data.index)
      console.log('socket open', index)
      setOpened({ index, opened: true })
      setTimeout(() => {
        setOpened({ index, opened: false })
      }, 30000)
    })
    s.on('disconnect', console.error)
    s.on('error', console.error)
    return s
  }, [])

  return [socket, (key, data) => socket.emit(key, data)]
}

export default useSocket
