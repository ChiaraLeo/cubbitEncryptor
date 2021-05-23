import React from 'react'
import { ConstString } from 'language/encryptStrings'
import { CubbitReduxStore } from '_redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import IconFileName from 'components/IconFileName'
import OrangeButton from 'components/OrangeButton'
import TextInput from 'components/TextInput'
import useTranslate from 'customHooks/useTranslate'

const selectState = (state: CubbitReduxStore) => ({
  urlFile: state.file.encryptedFile?.url,
  fileName: state.file.encryptedFile?.fileName,
  keyToShare: state?.file?.keyToShare
})

const DowloadFile = () => {
  const { urlFile, fileName, keyToShare = '' } = useSelector(selectState)
  const [dowloadtext, encryptionkeytext] = useTranslate([ConstString.DOWNLOAD, ConstString.YOURENCRYPTIONKEY])
  return (
    <Container>
      <ContainerIcon>
        <IconFileName fileName={fileName || ''} secondary />
      </ContainerIcon>
      <StyledText>{encryptionkeytext}</StyledText>
      <TextInput withCopyButton value={keyToShare || ''} />
      <OrangeButton download={fileName || ''} href={urlFile || ''} label={dowloadtext} />
    </Container>
  )
}

const StyledText = styled.p`
font-family: Nunito;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 26px;
margin-bottom: 25px;
margin-top: 0px;
padding: 0;
`

const ContainerIcon = styled.div`

height: 102px;
@media(min-width: 936px) {
  width: 552px;
}

@media(max-width: 936px) {
  width: 100%;
}
padding-top: 18px;
margin-bottom: 22px;
border: 1px solid #363636;
`

const Container = styled.div`
display: flex;
flex-direction: column;
align-content: center;
align-items: center;
margin-top: 25px;
justify-content: center;
text-align: center;
`

export default DowloadFile
