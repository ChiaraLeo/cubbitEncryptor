import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ConstString } from 'language/encryptStrings'
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
import useTranslate from 'customHooks/useTranslate'
import { requestResetAll } from '_redux/Modules/Request/Actions'

export const asyncTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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
  const [progressUpload, setProgressUpload] = useState(0)
  const [selectfiletext, dropfileheretext, encrypttext, decrypttext] = useTranslate([
    ConstString.SELECTFILE,
    ConstString.DROPFILEHERE,
    ConstString.ENCRYPT,
    ConstString.DECRYPT
  ])

  const onDrop = useCallback(files => {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = async (e: any) => {
      dispatch(setUploadedFile({ file, buffer: e.target.result }))
      await asyncTimeout(400)
      setProgressUpload(0)
    }

    reader.onprogress = (e: any) => {
      if (e.lengthComputable) {
        const percentLoaded = Math.round((e.loaded / e.total) * 100)
        setProgressUpload(percentLoaded)
      }
    }

    reader.readAsArrayBuffer(file)
  }, [dispatch])

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, multiple: false })

  const onClickEncypt = useCallback(() => {
    dispatch(generateKeyAndEncryptFile(uploadedFile, requestKeyEncryptFile))
  }, [uploadedFile, dispatch])

  useEffect(() => {
    if (requestEncryption === ReduxRequestKey.REQUEST_SUCCESS) {
      history.push(Routes.DOWNLOAD_FILE)
    }
    return () => {
      dispatch(requestResetAll())
    }
  }, [requestEncryption, history, dispatch])

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
              <ButtonFileText> {selectfiletext}</ButtonFileText>
              <StyledArrowDown />
            </ButtonFile>
            <Text> {dropfileheretext}</Text>
          </> : <IconFileName fileName={uploadedFile?.file.name} />}
          {progressUpload !== 0 && <ProgressBar progressUpload={progressUpload} />}
        </DragArea>
      </Container>
      <div>
        <StyledButton
          label={encrypttext}
          disabled={!uploadedFile}
          onClick={onClickEncypt}
        />
        <StyledButton
          secondary
          label={decrypttext}
          disabled={!uploadedFile}
          onClick={onClickDecrypt}
        />
      </div>
    </>

  )
}
interface ProgressBarProps {
  progressUpload: number
}

const ProgressBar = styled.div`
width: ${(props: ProgressBarProps) => `${props.progressUpload}%`};
height: 10px;
background: #363636;
margin-top: auto;
margin-bottom: 0px;
transition : width 0.4s linear;
align-self: start;
`

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
