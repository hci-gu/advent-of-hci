import { GridItem } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { a } from '@react-spring/web'
import styled from 'styled-components'
import moment from 'moment'
import { QRCode } from 'react-qrcode-logo'
import { useAtom } from 'jotai'
import { setOpenedAtom } from '../state'
import useOpenedAnimation from '../hooks/useOpenedAnimation'

import woodPatternImg from './wood-pattern.png'
import Content from './Content'
import { daysAtom } from '../state'
import useMobileLayout from '../hooks/useMobileLayout'
const API_URL = import.meta.env.VITE_API_URL

let SIZE = 175
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

    > h2 {
      font-size: 36px;
      margin: 0;
      margin-bottom: 5px;
      line-height: 0.65;
    }
  }
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: 36px;

    > div {
      > h2 {
        font-size: 36px;
      }
    }
  }
`

const isWeekend = (date) => {
  const day = moment(date).day()
  return day === 0 || day === 6
}

const isToday = (date) => {
  return moment(date).isSame(moment('2021-12-01'), 'day')
}

const getDaysLeft = (date) => {
  const now = moment('2021-12-01').startOf('day')
  const next = moment(date).startOf('day')
  return next.diff(now, 'days')
}

const textForRemainingDays = (daysLeft) => {
  if (daysLeft === 1) {
    return `Come back tomorrow to see whats behind this door!`
  }
  return `Come back in ${daysLeft} days to see whats behind this door!`
}

const Day = ({ date, text, image, url, opened, index, gridIndex }) => {
  const mobileLayout = useMobileLayout()
  useEffect(() => {
    SIZE = 100
  }, [mobileLayout])
  const [, setOpened] = useAtom(setOpenedAtom)
  const [frontStyle, backStyle] = useOpenedAnimation(opened, gridIndex)
  const daysLeft = getDaysLeft(date)

  return (
    <StyledGridItem
      m={8}
      isWeekend={isWeekend(date)}
      onClick={() => setOpened({ opened: !opened, index })}
      style={{ zIndex: opened ? 1 : 0 }}
      isOpen={opened}
    >
      <a.div style={frontStyle}>
        {isToday(date) && !mobileLayout && (
          <>
            <h2>{index}</h2>
            <QRCode
              value={`${API_URL}/open?url=${url}&index=${index}`}
              size={128}
              quietZone={6}
              bgColor="#fafafa"
              fgColor="#171e2d"
            />
          </>
        )}
        {(!isToday(date) || mobileLayout) && <h1>{index}</h1>}
      </a.div>
      <a.div style={{ ...backStyle, padding: '32px' }}>
        {daysLeft <= 0 && (
          <Content text={text} image={image} index={index} url={url} />
        )}
        {daysLeft > 0 && <span>{textForRemainingDays(daysLeft)}</span>}
      </a.div>
    </StyledGridItem>
  )
}

export default Day
