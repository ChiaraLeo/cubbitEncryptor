import ReduxGenericKey from './Keys'
import { GenericReducer } from './types'
import { ReduxAction } from '../sharedTypes'

const initialState: GenericReducer = {
  language: 'decrypted'
}

export default function requestReduced (state = initialState, action: ReduxAction<ReduxGenericKey>) : GenericReducer {
  const { type, payload } = action
  switch (type) {
    case ReduxGenericKey.SET_LANGUAGE:
      return {
        ...state,
        language: payload.language
      }
    case ReduxGenericKey.RESET_GENERIC:
      return initialState
    default:
      return state
  }
}
