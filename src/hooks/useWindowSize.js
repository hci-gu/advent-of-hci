import { useEffect, useLayoutEffect, useRef, useState } from 'react'

function useEventListener(eventName, handler, element) {
  const savedHandler = useRef()

  useEffect(() => {
    const targetElement = (element && element.current) || window
    if (!(targetElement && targetElement.addEventListener)) {
      return
    }

    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!savedHandler && !!savedHandler.current) {
        savedHandler.current(event)
      }
    }

    targetElement.addEventListener(eventName, eventListener)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, handler])
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEventListener('resize', handleSize)

  useLayoutEffect(() => {
    handleSize()
  }, [])

  return windowSize
}

export default useWindowSize
