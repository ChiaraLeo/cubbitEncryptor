import React from 'react'
import styled from 'styled-components'

const OrangeButton = (props: {
  onClick: any,
  label: string
}) => {
  const { onClick, label } = props

  return <Button {...{ onClick }}>
    {label}
  </Button>
}

const Button = styled.button`
  background: #FFA047;
  color: #FFFFFF;
  margin-top: 47px;
  text-decoration: none;
  border-radius: 3px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 48px;
  height: 48px;
  width: 216px;
  border: none;
  align-items: center;
  text-align: center;
  &:hover {
    opacity: 0.8
  }
`
export default OrangeButton
