import React from 'react'
import styled from 'styled-components'
import SwitchLanguage from '../SwitchLanguage'
import { ReactComponent as Icon } from './logo.svg'
type Props = {
  disabled: boolean;
};

const AppBar = () => {
  return (
    <Container>
      <Bar>
        <StyledIcon >
          <Icon />
        </StyledIcon>
        <SwitchLanguage />
      </Bar>
    </Container>
  )
}

const Container = styled.div`
height: 216px;
background-color: #161616;
`

const StyledIcon = styled.svg`
position: absolute;
width: 119px;
height: 46px;
left: 23px;
top: 13px;
`

const Bar = styled.div`
background-color: #292929;
position: fixed;
top: 0;
left: auto;
right: 0;
width: 100%;
z-index: 1000;
height: 72px;
`

export default AppBar
