import useWindowSize from './useWindowSize'

const useMobileLayout = () => {
  const { width } = useWindowSize()
  console.log(width)
  return width < 768
}

export default useMobileLayout
