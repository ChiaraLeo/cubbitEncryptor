import ReduxFileKey from './Keys'
import { FileReducer } from './types'
import { ReduxAction } from '../sharedTypes'

const initialState: FileReducer = {
  uploadedFile: null,
  keyToShare: null,
  encryptedFile: null,
  decryptedFile: null
}

export default function fileReduced (state = initialState, action: ReduxAction<ReduxFileKey>) : FileReducer {
  const { type, payload } = action
  switch (type) {
    case ReduxFileKey.SET_FILE_UPLOADED:
      return {
        ...state,
        uploadedFile: payload.uploadedFile
      }
    case ReduxFileKey.SET_KEY_TO_SHARE_AND_ENCRYPT_FILE:
      return {
        ...state,
        keyToShare: payload.keyToShare,
        encryptedFile: payload.encryptedFile
      }
    case ReduxFileKey.SET_DECRYPTED_FILE:
      return {
        ...state,
        decryptedFile: payload.decryptedFile
      }
    case ReduxFileKey.RESET_FILE:
      return initialState
    default:
      return state
  }
}
