import { Dispatch } from 'redux'
import ReduxFileKey from './Keys'
import * as CryptoJS from 'crypto-js'
import { requestFailure, requestIsFetching, requestSuccess } from '../Request/Actions'
import { CubbitReduxStore } from '_redux'

export const setUploadedFile = (uploadedFile: any) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: ReduxFileKey.SET_FILE_UPLOADED,
      payload: {
        uploadedFile
      }
    })
  }

export const decryptFileByKey = (keyForDecrypt: string, requestKey: string) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      requestIsFetching(dispatch)(requestKey)
      const state: CubbitReduxStore = getState()
      const uploadedFile = state?.file?.uploadedFile
      const stringBase64 = `data:application/pdf;base64,`
      const stringToDecrypt = uploadedFile?.buffer.replace(stringBase64, '')
      const decrypted = CryptoJS.AES.encrypt(stringToDecrypt, keyForDecrypt).toString()
      const url = stringBase64 + decrypted
      const fileName = uploadedFile?.file.name

      dispatch({
        type: ReduxFileKey.SET_DECRYPTED_FILE,
        payload: {
          decryptedFile: {
            url,
            fileName
          }
        }
      })
      requestSuccess(dispatch)(requestKey)
    } catch (error) {
      requestFailure(dispatch)(requestKey, error)
    }
  }

export const generateKeyAndEncryptFile = (uploadedFile: any, requestKey: string) =>
  async (dispatch: Dispatch) => {
    try {
      requestIsFetching(dispatch)(requestKey)
      const salt = CryptoJS.lib.WordArray.random(128 / 8)
      const keyToShare = CryptoJS.PBKDF2('Secret Passphrase', salt, {
        keySize: 128 / 32
      }).toString()
      const stringBase64 = `data:${uploadedFile.file.type};base64,`
      const stringToEncrypt = uploadedFile?.buffer.replace(stringBase64, '')

      const encrypted = CryptoJS.AES.encrypt(stringToEncrypt, keyToShare).toString()
      const url = stringBase64 + encrypted
      const fileName = uploadedFile?.file.name + '.enc'

      dispatch({
        type: ReduxFileKey.SET_KEY_TO_SHARE_AND_ENCRYPT_FILE,
        payload: {
          keyToShare,
          encryptedFile: {
            url,
            fileName
          }
        }
      })
      requestSuccess(dispatch)(requestKey)
    } catch (error) {
      requestFailure(dispatch)(requestKey, error)
    }
  }

export const resetFile = () => (dispatch: Dispatch) => {
  dispatch({
    type: ReduxFileKey.RESET_FILE
  })
}
