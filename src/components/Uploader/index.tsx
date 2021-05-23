import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { ConstString } from 'language/encryptStrings'
import { useDropzone } from 'react-dropzone'
import IconFileName from 'components/IconFileName'
import { ReactComponent as Icon } from './icon.svg'
import { ReactComponent as ArrowDown } from './arrowDown.svg'
import useTranslate from 'customHooks/useTranslate'
import { asyncTimeout } from 'utils'

export const requestKeyEncryptFile = 'ENCRYPT_FILE_KEY'

const Uploader = (props: {uploadedFile: any, onFileUpload: any}) => {
  const { uploadedFile, onFileUpload } = props
  const [progressUpload, setProgressUpload] = useState<number | null>(null)
  const [selectfiletext, dropfileheretext] = useTranslate([
    ConstString.SELECTFILE,
    ConstString.DROPFILEHERE
  ])

  const onDrop = useCallback(files => {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = async (e: any) => {
      await asyncTimeout(400)
      onFileUpload({ file, buffer: e.target.result })
      setProgressUpload(null)
    }

    reader.onprogress = (e: any) => {
      if (e.lengthComputable) {
        const percentLoaded = Math.round((e.loaded / e.total) * 100)
        setProgressUpload(percentLoaded)
      }
    }

    reader.readAsDataURL(file)
  }, [onFileUpload])

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, multiple: false })

  return (
    <>
      <Container>
        <DragArea onClick={open} {...getRootProps()}>
          <input {...getInputProps()} />
          <ContainerButtonFile>
            {!uploadedFile?.file ? <>
              <ButtonFile type='button' onClick={open}>
                <StyledIcon />
                <ButtonFileText> {selectfiletext}</ButtonFileText>
                <StyledArrowDown />
              </ButtonFile>
              <Text> {dropfileheretext}</Text>
          </> : <IconFileName fileName={uploadedFile?.file.name} />}
          </ContainerButtonFile>
          <ProgressBar progressUpload={progressUpload} />
        </DragArea>
      </Container>
    </>

  )
}
interface ProgressBarProps {
  progressUpload: number | null
}

const ContainerButtonFile = styled.div`
margin-top: 64px;
`

const ProgressBar = styled.div`
width: ${(props: ProgressBarProps) => `${props.progressUpload}%`};
height: 10px;
background: #363636;
margin-top: auto;
margin-bottom: 0px;
transition: ${(props: ProgressBarProps) => `${props.progressUpload !== null ? ' width 0.4s linear;' : ''}`};
align-self: start;
`

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
text-align: center;

color: #161616;
`

const Container = styled.div`
cursor: pointer;
height: 216px;
margin-bottom: 44px;
background: #FFA047;
@media(min-width: 936px) {
  width: 936px;
};

@media(max-width: 936px) {
  width: 100%;
};

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
export default Uploader
