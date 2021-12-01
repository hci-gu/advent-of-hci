import React from 'react'
import ReactDOM from 'react-dom'
import Snowfall from 'react-snowfall'
import styled from 'styled-components'
import { Flex, Grid } from '@chakra-ui/layout'

import './index.css'
import Day from './Day'
import { useAtom } from 'jotai'
import { daysAtom } from './state'
import useSocket from './hooks/useSocket'
import useSong from './hooks/useSong'
import useMobileLayout from './hooks/useMobileLayout'

const Title = styled.h1`
  font-family: 'Mountains of Christmas', cursive;
  font-size: 48px;
  color: #db5461;
`

const Index = () => {
  const [days] = useAtom(daysAtom)
  const mobileLayout = useMobileLayout()
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        style={{ minHeight: '100vh' }}
      >
        <Title>Advent of HCI</Title>
        <Grid
          templateColumns={
            mobileLayout ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr 1fr 1fr'
          }
        >
          {days.map((d, i) => (
            <Day {...d} gridIndex={i} key={`Day_${d.index}`} />
          ))}
        </Grid>
      </Flex>
      <Snowfall />
    </>
  )
}

const Root = () => {
  useSocket()
  useSong()

  return (
    <>
      <Index />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
)
