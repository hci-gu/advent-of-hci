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

  > p {
    font-size: 24px;
  }
`

const Content = ({ text, image, index }) => {
  return (
    <Container>
      <Wrapper>
        <p>
          {text.split('\n').map((text) => (
            <>
              {text}
              <br />
            </>
          ))}
        </p>
        {image && <img src={`./public/images/${image}`} />}
      </Wrapper>
      <Overlay />
    </Container>
  )
}

export default Content