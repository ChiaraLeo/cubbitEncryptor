import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'

const TextInput = (props: {
  value: string;
  onChange?: any;
  withCopyButton?: boolean;
}) => {
  const { value, onChange, withCopyButton = true } = props

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
width: 552px;
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
width: 116px;
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
width: 380px;
color: #FFFFFF;
outline:none;
`
export default TextInput
