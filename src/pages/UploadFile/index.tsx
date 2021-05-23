import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { ConstString } from 'language/encryptStrings'
import StyledButton from 'components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { generateKeyAndEncryptFile, setUploadedFile } from '_redux/Modules/File/Actions'
import { CubbitReduxStore } from '_redux'
import ReduxRequestKey from '_redux/Modules/Request/Keys'
import { useHistory } from 'react-router'
import { Routes } from 'routes'
import Typography from 'components/Typography'
import useTranslate from 'customHooks/useTranslate'
import { requestResetAll } from '_redux/Modules/Request/Actions'
import Uploader from 'components/Uploader'
import Loader from 'components/Loader'

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
  const [encrypttext, decrypttext] = useTranslate([
    ConstString.ENCRYPT,
    ConstString.DECRYPT
  ])

  const onFileUpload = useCallback(({ file, buffer }) => {
    dispatch(setUploadedFile({ file, buffer }))
  }, [dispatch]
  )

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
      {isFetching ? <Loader /> : <>
        <Uploader onFileUpload={onFileUpload} uploadedFile={uploadedFile} />
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
      </>}
    </>

  )
}

const PositionatedSubtitle = styled.div`
margin-top: 24px;
margin-bottom: 48px;
`
export default UploadFile
