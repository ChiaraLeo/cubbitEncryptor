import React from 'react'
import styled from 'styled-components'

const OrangeLink = (props: {
  download: string,
  href: string,
  label: string
}) => {
  const { download, href, label } = props

  return <Link {...{ download, href }}>
    {label}
  </Link>
}

const Link = styled.a`
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
  width: 168px;
  border: none;
  align-items: center;
  text-align: center;
  &:hover {
    opacity: 0.8
  }
`
export default OrangeLink
