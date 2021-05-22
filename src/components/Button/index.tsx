import React from 'react'
import styled from 'styled-components'

const StyledButton = (props: {
  label: string,
  onClick: any,
  disabled?: boolean,
  secondary?: boolean
}) => {
  const { label, onClick, secondary = false, disabled = false } = props

  return <Button disabled={disabled} primary={!secondary} onClick={onClick}>
    {label}
  </Button>
}

interface PropsStyle {
  primary: boolean
}

const Button = styled.button`
  background: ${(props: PropsStyle) => props.primary ? '#009EFF' : '#0065FF'};
  color: #FFFFFF;
  margin: 12px;
  border-radius: 3px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  height: 48px;
  width: 168px;
  cursor: pointer;
  border: none;
  align-items: center;
  text-align: center;
  &:hover {
    opacity: 0.8
  }
`
export default StyledButton
