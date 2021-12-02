import useWindowSize from './useWindowSize'

const useMobileLayout = () => {
  const { width } = useWindowSize()
  return width < 768
}

export default useMobileLayout
