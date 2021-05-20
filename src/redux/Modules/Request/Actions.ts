import { Dispatch } from 'redux'
import ReduxRequestKey from './Keys'

export const requestIsFetching = (dispatch: Dispatch) => (key: string) => {
  dispatch({
    type: ReduxRequestKey.REQUEST_FETCHING,
    payload: {
      key
    }
  })
}

export const requestSuccess = (dispatch: Dispatch) => (key: string) => {
  dispatch({
    type: ReduxRequestKey.REQUEST_SUCCESS,
    payload: {
      key
    }
  })
}

export const requestFailure = (dispatch: Dispatch) => (key: string, error: string) => {
  console.error(`requestFailure: ${key}`)
  console.error(error)
  dispatch({
    type: ReduxRequestKey.REQUEST_FAILURE,
    payload: {
      key,
      error
    }
  })
}

export const requestResetAll = () => (dispatch: Dispatch) => {
  dispatch({
    type: ReduxRequestKey.REQUEST_RESET_ALL
  })
}
