import useMediaQuery from 'customHooks/useMediaQuery'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { Routes } from 'routes'
import styled from 'styled-components'
import SwitchLanguage from '../SwitchLanguage'
import { ReactComponent as Icon } from './logo.svg'

const AppBar = () => {
  const isDesktop = useMediaQuery('(min-width: 936px)')
  const history = useHistory()
  const handleClickIcon = useCallback(() => {
    history.push(Routes.UPLOAD_FILE)
  },
  [history])

  return (
    <>
      <Container>
        <Bar>
          <a onClick={handleClickIcon} >
            <StyledIcon >
              <Icon />
            </StyledIcon>
          </a>
          {isDesktop && <SwitchLanguage />}
        </Bar>
      </Container>
      <Container2>
        {!isDesktop && <SwitchLanguage />}
      </Container2>
    </>
  )
}

const Container2 = styled.div`
height: 144px;
`

const Container = styled.div`
background-color: #161616;
height: 72px;
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
