import ReduxRequestKey from './Keys'
import { ReducerRequest } from './types'
import { ReduxAction } from '../sharedTypes'

const initialState: ReducerRequest = {}

export default function requestReduced (state = initialState, action: ReduxAction<ReduxRequestKey>) : ReducerRequest {
  const { type, payload } = action
  switch (type) {
    case ReduxRequestKey.REQUEST_FETCHING:
      return {
        ...state,
        [payload.key]: {
          status: ReduxRequestKey.REQUEST_FETCHING,
          error: undefined
        }
      }
    case ReduxRequestKey.REQUEST_SUCCESS:
      return {
        ...state,
        [payload.key]: {
          status: ReduxRequestKey.REQUEST_SUCCESS,
          error: undefined
        }
      }
    case ReduxRequestKey.REQUEST_FAILURE:
      return {
        ...state,
        [payload.key]: {
          status: ReduxRequestKey.REQUEST_FAILURE,
          error: payload.error
        }
      }
    case ReduxRequestKey.REQUEST_RESET_ALL:
      return initialState
    default:
      return state
  }
}
