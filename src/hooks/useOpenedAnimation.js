import { useSpring } from '@react-spring/web'
import useMobileLayout from './useMobileLayout'
import useWindowSize from './useWindowSize'

const positionForIndex = (size, windowSize, index) => {
  if (windowSize.width < 768) {
    const row = Math.floor(index / 3)
    const col = index - row * 3
    const leftOffset = col * (size + 8)
    const heightOffset = row * size
    return [
      windowSize.width * 0.125 - size - leftOffset,
      windowSize.height * 0.125 - size / 2 - heightOffset,
    ]
  }

  const row = Math.floor(index / 6)
  const col = index - row * 6
  const leftOffset = col * (size + 8)
  const heightOffset = row * size
  return [
    windowSize.width * 0.05 - size - leftOffset,
    windowSize.height * 0.125 - size / 2 - heightOffset,
  ]
}

const useOpenedAnimation = (opened, gridIndex) => {
  const mobileLayout = useMobileLayout()
  const SIZE = mobileLayout ? 100 : 175
  const windowSize = useWindowSize()
  const [x, y] = positionForIndex(SIZE, windowSize, gridIndex)
  const { transform, opacity, top, left, width, height } = useSpring({
    opacity: opened ? 1 : 0,
    transform: `perspective(600px) rotateY(${opened ? 180 : 0}deg)`,
    left: opened ? x : 0,
    top: opened ? y : 0,
    width: opened
      ? mobileLayout
        ? windowSize.width * 0.9
        : windowSize.width * 0.5
      : SIZE,
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
