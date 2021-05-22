import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { ConstString } from 'language/encryptStrings'
import Translator from 'components/Translator'
import { useDropzone } from 'react-dropzone'
import StyledButton from 'components/Button'
import IconFileName from 'components/IconFileName'
import { useDispatch, useSelector } from 'react-redux'
import { generateKeyAndEncryptFile, setUploadedFile } from '_redux/Modules/File/Actions'
import { CubbitReduxStore } from '_redux'
import ReduxRequestKey from '_redux/Modules/Request/Keys'
import { useHistory } from 'react-router'
import { Routes } from 'routes'
import { ReactComponent as Icon } from './icon.svg'
import { ReactComponent as ArrowDown } from './arrowDown.svg'
import Typography from 'components/Typography'

export const requestKeyEncryptFile = 'ENCRYPT_FILE_KEY'

const selectState = (state: CubbitReduxStore) => ({
  uploadedFile: state.file.uploadedFile,
  isFetching: state?.request[requestKeyEncryptFile]?.status === ReduxRequestKey.REQUEST_FETCHING,
  requestEncryption: state?.request?.[requestKeyEncryptFile]?.status
})

const UploadFile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { uploadedFile, isFetching, requestEncryption } = useSelector(selectState)
  const SELECTFILE = Translator({ constant: ConstString.SELECTFILE })
  const DROPFILEHERE = Translator({ constant: ConstString.DROPFILEHERE })
  const ENCRYPT = Translator({ constant: ConstString.ENCRYPT })
  const DECRYPT = Translator({ constant: ConstString.DECRYPT })

  const onDrop = useCallback(files => {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e: any) => {
      dispatch(setUploadedFile({ file, buffer: e.target.result }))
    }

    reader.readAsArrayBuffer(file)
  }, [dispatch, setUploadedFile])

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, multiple: false })

  const onClickEncypt = useCallback(() => {
    dispatch(generateKeyAndEncryptFile(uploadedFile, requestKeyEncryptFile))
  }, [uploadedFile, dispatch])

  useEffect(() => {
    if (requestEncryption === ReduxRequestKey.REQUEST_SUCCESS) {
      history.push(Routes.DOWNLOAD_FILE)
    }
  }, [requestEncryption])

  const onClickDecrypt = useCallback(() => {
    history.push(Routes.DOWNLOAD_DECRYPT_FILE)
  }, [history])

  return (
    <>
      <PositionatedSubtitle>
        <Typography constant={ConstString.SUBTITLE} variant='subtitle' />
      </PositionatedSubtitle>
      <Container isFetching={isFetching}>
        <DragArea onClick={open} {...getRootProps()}>
          <input {...getInputProps()} />
          {!uploadedFile?.file ? <>
            <ButtonFile type='button' onClick={open}>
              <StyledIcon />
              <ButtonFileText> {SELECTFILE}</ButtonFileText>
              <StyledArrowDown />
            </ButtonFile>
            <Text> {DROPFILEHERE}</Text>
          </> : <IconFileName fileName={uploadedFile?.file.name} />}
        </DragArea>
      </Container>
      <div>
        <StyledButton
          label={ENCRYPT}
          disabled={!uploadedFile}
          onClick={onClickEncypt}
        />
        <StyledButton
          secondary
          label={DECRYPT}
          disabled={!uploadedFile}
          onClick={onClickDecrypt}
        />
      </div>
    </>

  )
}

const PositionatedSubtitle = styled.div`
margin-top: 24px;
margin-bottom: 48px;
`

interface ContainerProps {
  isFetching: boolean
}

const StyledArrowDown = styled(ArrowDown)`
height: 7,4px;
width: 12px;
padding: 20px;
`

const StyledIcon = styled(Icon)`
height: 22px;
width: 19px;
padding-top: 13px;
padding-right: 13px;
padding-bottom: 13px;
padding-left: 26px;
`

const ButtonFileText = styled.p`
font-family: Nunito;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 26px;
width: 142px;
line-height: 48px;
cursor: pointer;
height: 48px;
text-align: center;
color: #292929;
border-right: 1px solid #98A0A6;
`

const Text = styled.p`
font-family: Nunito;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 26px;
/* or 162% */
display: flex;
align-items: center;
text-align: center;

color: #161616;
`

const Container = styled.div`
cursor: pointer;
height: 216px;
margin-bottom: 44px;
background: ${(props: ContainerProps) => props.isFetching ? '#009EFF' : '#FFA047'};
@media(min-width: 936px) {
  width: 936px;
}

@media(max-width: 936px) {
  width: 100%;
}

`
const DragArea = styled.div`
border: 1px dashed #363636;
display: flex;
flex-direction: column;
align-content: center;
align-items: center;
justify-content: center;
background: rgba(22, 22, 22, 0.16);
box-sizing: border-box;
height: 200px;
margin: 8px;
text-align: center;
`

const ButtonFile = styled.button`
  font-family: Nunito;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 26px;
/* or 162% */
height: 48px;
display: flex;
align-items: center;
border: none;
color: #292929;

background: #FFFFFF;
border-radius: 3px;
`
export default UploadFile
