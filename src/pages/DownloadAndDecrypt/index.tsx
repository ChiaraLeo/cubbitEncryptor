import React, { useCallback, useState } from 'react'
import { ConstString } from 'language/encryptStrings'
import Translator from 'components/Translator'
import { useDispatch, useSelector } from 'react-redux'
import { CubbitReduxStore } from '_redux'
import { decryptFileByKey } from '_redux/Modules/File/Actions'
import styled from 'styled-components'
import IconFileName from 'components/IconFileName'
import TextInput from 'components/TextInput'
import OrangeButton from 'components/OrangeButton'

export const requestKeyDecryptFile = 'DECRYPT_FILE_KEY'

const selectState = (state: CubbitReduxStore) => ({
  uploadedFile: state.file.uploadedFile,
  fileName: state.file.decryptedFile?.fileName,
  url: state.file.decryptedFile?.url
})

const DowloadDecryptFile = () => {
  const dispatch = useDispatch()
  const { fileName, url } = useSelector(selectState)
  const [keyForDecrypt, setKeyForDecrypt] = useState<string>('')
  const DOWNLOAD = Translator({ constant: ConstString.DOWNLOAD })
  const YOURENCRYPTIONKEY = Translator({ constant: ConstString.YOURENCRYPTIONKEY })

  const onClickDecrypt = useCallback(() => {
    dispatch(decryptFileByKey(keyForDecrypt, requestKeyDecryptFile))
  }, [keyForDecrypt, dispatch])

  return (
    <Container>
      <ContainerIcon>
        <IconFileName fileName={fileName || ''} secondary />
      </ContainerIcon>
      <StyledText>{YOURENCRYPTIONKEY}</StyledText>
      <TextInput value={keyForDecrypt || ''} />
      <a onClick={onClickDecrypt}> ENCRYPT </a>
      <OrangeButton download={fileName || ''} href={url || ''} label={DOWNLOAD} />
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
width: 552px;
height: 102px;
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

export default DowloadDecryptFile
