import { useSpring } from '@react-spring/web'
import useWindowSize from './useWindowSize'

const SIZE = 175

const positionForIndex = (windowSize, index) => {
  const row = Math.floor(index / 6)
  const col = index - row * 6
  const leftOffset = col * (SIZE + 8)
  const heightOffset = row * SIZE
  return [
    windowSize.width * 0.125 - SIZE - leftOffset,
    windowSize.height * 0.125 - SIZE / 2 - heightOffset,
  ]
}

const useOpenedAnimation = (opened, gridIndex) => {
  const windowSize = useWindowSize()
  const [x, y] = positionForIndex(windowSize, gridIndex)
  const { transform, opacity, top, left, width, height } = useSpring({
    opacity: opened ? 1 : 0,
    transform: `perspective(600px) rotateY(${opened ? 180 : 0}deg)`,
    left: opened ? x : 0,
    top: opened ? y : 0,
    width: opened ? windowSize.width * 0.5 : SIZE,
    height: opened ? windowSize.height * 0.75 : SIZE,
    config: { mass: 5, tension: 400, friction: 120 },
  })

  return [
    {
      opacity: opacity.to((o) => 1 - o),
      transform,
      width,
      height,
      left,
      top,
    },
    {
      opacity,
      transform,
      left,
      top,
      width,
      height,
      rotateY: '180deg',
    },
  ]
}

export default useOpenedAnimation
