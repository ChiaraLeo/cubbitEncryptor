import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Icon } from './icon.svg'

type Props = {
  secondary: boolean;
};

const IconFileName = (props: {fileName: string, secondary?: boolean}) => {
  const { fileName, secondary = false } = props
  return <>
    <StyledIcon secondary={secondary}>
      <Icon />
    </StyledIcon>
    <Text secondary={secondary}>{fileName}</Text>
  </>
}

export default IconFileName

const Text = styled.p`
font-size: 16px;
color: ${(props: Props) => props.secondary ? '#FFFFFF' : '#292929'}
`

const StyledIcon = styled.svg`
width: 38px;
height: 44px;
fill: ${(props: Props) => props.secondary ? '#FFFFFF' : '#292929'}
color: ${(props: Props) => props.secondary ? '#FFFFFF' : '#292929'}
`
