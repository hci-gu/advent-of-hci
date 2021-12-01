import React from 'react'
import { Flex } from '@chakra-ui/layout'
import styled from 'styled-components'
import woodPatternImg from './wood-pattern.png'

const Container = styled(Flex)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;

  background-image: url(${woodPatternImg});
  background-color: rgba(40, 0, 10, 1);
  box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.9);

  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-family: 'Open Sans', sans-serif;
`

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.33);
  z-index: 0;
`

const Wrapper = styled.div`
  z-index: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    margin: 0 20px;
    font-size: 20px;
    white-space: pre-wrap;
    line-height: 1.75;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 1);
  }
  > img {
    margin-top: 16px;
    border-radius: 8px;
  }
  > a {
    margin-top: 16px;
    font-size: 24px;
    color: white;
  }
`

const Content = ({ date, text, image, url, index }) => {
  return (
    <Container>
      <Wrapper>
        <p>{text}</p>
        {image && <img src={`/images/${image}`} />}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </Wrapper>
      <Overlay />
    </Container>
  )
}

export default Content
