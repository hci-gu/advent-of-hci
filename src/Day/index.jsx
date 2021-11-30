import { GridItem } from '@chakra-ui/layout'
import React from 'react'
import { a } from '@react-spring/web'
import styled from 'styled-components'
import moment from 'moment'
import { QRCode } from 'react-qrcode-logo'
import { useAtom } from 'jotai'
import { setOpenedAtom } from '../state'
import useOpenedAnimation from '../hooks/useOpenedAnimation'

import woodPatternImg from './wood-pattern.png'
import Content from './Content'
const API_URL = import.meta.env.VITE_API_URL

const SIZE = 175

const base64Svg = () => {
  const svg = `<svg height="50" width="50">
    <circle cx="50" cy="50" r="40" stroke="#fff" stroke-width="2" fill="red" />
  </svg>`
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

const StyledGridItem = styled(GridItem)`
  position: relative;
  width: ${SIZE}px;
  height: ${SIZE}px;
  color: #171e2d;
  color: #fff;
  font-family: 'Mountains of Christmas', cursive;
  font-size: 48px;
  ${({ isWeekend }) => isWeekend && `color: #db5461;`}
  cursor: pointer;

  > div {
    background-image: url(${woodPatternImg});
    position: absolute;
    background-color: rgba(40, 0, 10, 1);
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    width: 100%;
    height: 100%;
    will-change: transform, opacity;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${({ isOpen }) =>
      isOpen && `filter: drop-shadow(0px 0px 16px rgba(0,0,0,0.75));`}
  }
`

const isWeekend = (date) => {
  const day = moment(date).day()
  return day === 0 || day === 6
}

const isToday = (date) => {
  return moment(date).isSame(moment('2021-12-01'), 'day')
}

const Day = ({ date, text, image, url, opened, index, gridIndex }) => {
  const [, setOpened] = useAtom(setOpenedAtom)
  const [frontStyle, backStyle] = useOpenedAnimation(opened, gridIndex)

  return (
    <StyledGridItem
      m={8}
      w={SIZE}
      h={SIZE}
      isWeekend={isWeekend(date)}
      onClick={() => setOpened({ opened: !opened, index })}
      style={{ zIndex: opened ? 1 : 0 }}
      isOpen={opened}
    >
      <a.div style={frontStyle}>
        {isToday(date) && (
          <QRCode
            value={`${API_URL}/open?url=${url}&index=${index}`}
            size={120}
            bgColor="#fafafa"
            fgColor="#171e2d"
          />
        )}
        {!isToday(date) && <h1>{index}</h1>}
      </a.div>
      <a.div style={{ ...backStyle, padding: '32px' }}>
        <Content text={text} image={image} index={index} />
      </a.div>
    </StyledGridItem>
  )
}

export default Day
