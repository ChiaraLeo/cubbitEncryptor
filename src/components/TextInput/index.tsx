import React from 'react'
import styled from 'styled-components'

const TextInput = (props: {
  value: string;
  onChange?: any;
  withCopyButton?: boolean;
}) => {
  const { value, onChange, withCopyButton = false } = props

  const handleClickCopy = () => {
    navigator.clipboard.writeText(value)
  }

  return <Container>
    <Input type='text' value={value} onChange={onChange} />
    {withCopyButton && <Button onClick={handleClickCopy}>Copy</Button>}
  </Container>
}

const Container = styled.div`
background: #292929;
border: 1px solid #363636;
padding-left: 32px;
height: 48px;
@media(min-width: 936px) {
  width: 552px;
}

display: flex;
justify-content: space-around;
flex-direction: row;
align-content: center;
align-items: center;
color: #FFFFFF;
outline:none;
box-sizing: border-box;
border-radius: 3px;
`

const Button = styled.button`
background: #009EFF;
height: 36px;
@media(min-width: 936px) {
  width: 116px;
}

@media(max-width: 936px) {
  width: 30%;
}
color: #FFFFFF;
border: none;
border-radius: 3px;
&:hover {
  opacity: 0.8
}
`

const Input = styled.input`
background: #292929;
border: none;;
height: 100%;

@media(min-width: 936px) {
  width: 380px;
}

@media(max-width: 936px) {
  width: 70%;
}
color: #FFFFFF;
outline:none;
`
export default TextInput
