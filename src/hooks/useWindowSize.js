import { useEffect, useState } from 'react'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    console.log('size', window.innerWidth)
    setTimeout(() => {
      console.log('delayed', window.innerWidth)
    }, 1500)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

export default useWindowSize
