import React, { useCallback, useEffect, useState } from 'react'
import { ConstString } from 'language/encryptStrings'
import { useDispatch, useSelector } from 'react-redux'
import { CubbitReduxStore } from '_redux'
import { decryptFileByKey } from '_redux/Modules/File/Actions'
import styled from 'styled-components'
import IconFileName from 'components/IconFileName'
import TextInput from 'components/TextInput'
import useTranslate from 'customHooks/useTranslate'
import OrangeButton from 'components/OrangeButton'
import { requestResetAll } from '_redux/Modules/Request/Actions'
import ReduxRequestKey from '_redux/Modules/Request/Keys'

export const requestKeyDecryptFile = 'DECRYPT_FILE_KEY'

const selectState = (state: CubbitReduxStore) => ({
  fileName: state.file.uploadedFile?.file.name,
  decryptedFile: state.file.decryptedFile,
  requestEncryption: state?.request?.[requestKeyDecryptFile]?.status
})

const DowloadDecryptFile = () => {
  const dispatch = useDispatch()
  const { fileName, requestEncryption, decryptedFile } = useSelector(selectState)
  const [keyForDecrypt, setKeyForDecrypt] = useState<string>('')
  const [downloadtext, youreencrypttext] = useTranslate([ConstString.DECRYPTDOWNLOAD, ConstString.YOURENCRYPTIONKEY])

  const onClickDecrypt = useCallback(() => {
    dispatch(decryptFileByKey(keyForDecrypt, requestKeyDecryptFile))
  }, [keyForDecrypt, dispatch])

  useEffect(() => {
    if (requestEncryption === ReduxRequestKey.REQUEST_SUCCESS) {
      const link = document.createElement('a')
      link.download = decryptedFile?.fileName || ''
      link.href = decryptedFile?.url || ''
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    return () => {
      dispatch(requestResetAll())
    }
  }, [requestEncryption, decryptedFile, dispatch])

  return (
    <Container>
      <ContainerIcon>
        <IconFileName fileName={fileName || ''} secondary />
      </ContainerIcon>
      <StyledText>{youreencrypttext}</StyledText>
      <TextInput onChange={(e: any) => setKeyForDecrypt(e.target.value)} value={keyForDecrypt || ''} />
      <OrangeButton onClick={onClickDecrypt} label={downloadtext} />
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
@media(min-width: 936px) {
  width: 552px;
}

@media(max-width: 936px) {
  width: 100%;
}
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
