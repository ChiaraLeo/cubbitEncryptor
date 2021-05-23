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
    <Button isActive={checked} onClick={() => onChange(true)}>
      {label1}
    </Button>
    <Button isActive={!checked} onClick={() => onChange(false)}>
      {label2}
    </Button>
  </Container>
}

const Container = styled.div`
border: 1px solid #009EFF;
@media(min-width: 936px) {
  position: absolute;
  right: 160px;
  top: 16px;
}

@media(max-width: 936px) {
  width: 240px;
  margin-top: 26px;
  margin-left: auto; 
  margin-right: auto; 
}
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
cursor: pointer;
border: none;
align-items: center;
text-align: center;
color: #FFFFFF;
background: #363636;

${(props: PropsGlobalStyle) => !props.isActive ? `
  width: 0;
  width: 120px;
  height: 40px;
  background-color: #009EFF;
  -webkit-transition: .5s;
  transition: .5s
` : ``};
`

export default Switch
