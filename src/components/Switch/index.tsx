import React from 'react'
import styled from 'styled-components'

const Switch = (props: {
  label1: string,
  label2: string,
  checked: boolean,
  onChange: any
}) => {
  const { label1, label2, onChange, checked } = props

  return <Container>
    <Button isActive={!checked} onClick={() => onChange(true)}>
      {label1}
    </Button>
    <Button isActive={checked} onClick={() => onChange(false)}>
      {label2}
    </Button>
  </Container>
}

const Container = styled.div`
position: absolute;
right: 160px;
top: 16px;
border: 1px solid #009EFF;
`

interface PropsGlobalStyle {
  isActive: boolean
}

const Button = styled.button`
font-family: Nunito;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 187.5%;
height: 40px;
width: 120px;
/* or 26px */
cursor: pointer;
border: none;
align-items: center;
text-align: center;
background: ${(props: PropsGlobalStyle) => props.isActive ? '#009EFF' : '#363636'};
color: #FFFFFF;
`

export default Switch
