import React from 'react'
import styled from 'styled-components'
import { ConstString } from '../../language/encryptStrings'
import translator from '../Translator'

export type variantTypography = 'title' | 'subtitle' | 'caption'

const Typography = (props: { constant: ConstString, variant: variantTypography }) => {
  const { constant, variant } = props
  const traslatedString = translator({ constant })
  switch (variant) {
    case 'subtitle':
      return (
        <Subtitle>
          {traslatedString}
        </Subtitle>
      )
    case 'caption':
      return (
        <Caption>
          {traslatedString}
        </Caption>
      )
    default:
      return (
        <Title>
          {traslatedString}
        </Title>
      )
  }
}

const Title = styled.h2`
font-family: Nunito;
font-style: normal;
font-weight: 900;
font-size: 36px;
line-height: 47px;
/* identical to box height, or 130% */

display: flex;
align-items: center;
text-align: center;

color: #FFFFFF;
`

const PTag = styled.p`
font-family: Nunito;
font-style: normal;
font-weight: normal;
text-align: center;
`

const Subtitle = styled(PTag)`
font-size: 16px;
line-height: 26px;
/* or 162% */
color: #FFFFFF;
`

const Caption = styled(PTag)`
font-size: 14px;
line-height: 23px;
/* or 162% */

display: flex;
align-items: flex-end;
text-align: center;

color: #98A0A6;
`

export default Typography
