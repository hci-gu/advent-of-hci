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

const Title = styled.h1`
  font-family: 'Mountains of Christmas', cursive;
  font-size: 48px;
  color: #db5461;
`

const Index = () => {
  const [days] = useAtom(daysAtom)
  useSocket()
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        h={'100vh'}
      >
        <Title>Advent of HCI</Title>
        <Grid templateColumns="1fr 1fr 1fr 1fr 1fr 1fr">
          {days.map((d, i) => (
            <Day {...d} gridIndex={i} key={`Day_${d.index}`} />
          ))}
        </Grid>
      </Flex>
      <Snowfall />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
)
