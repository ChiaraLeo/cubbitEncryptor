import useTranslate from 'customHooks/useTranslate'
import React from 'react'
import styled from 'styled-components'
import { ConstString } from '../../language/encryptStrings'

export type variantTypography = 'title' | 'subtitle' | 'caption'

const Typography = (props: { constant: ConstString, variant: variantTypography }) => {
  const { constant, variant } = props
  const [traslatedString] = useTranslate([constant])
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
text-align: center;
color: #FFFFFF;
padding: 0px;
margin: 0px;
`

const PTag = styled.p`
font-family: Nunito;
font-style: normal;
font-weight: normal;
text-align: center;
padding: 0px;
margin: 0px;
`

const Subtitle = styled(PTag)`
font-size: 16px;
line-height: 26px;
color: #FFFFFF;
padding: 0px;
margin: 0px;
`

const Caption = styled(PTag)`
font-size: 14px;
line-height: 23px;
text-align: center;
color: #98A0A6;
padding: 0px;
margin: 0px;
`

export default Typography
