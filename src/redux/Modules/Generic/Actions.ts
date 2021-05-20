import { Dispatch } from 'redux'
import ReduxGenericKey from './Keys'
import { Language } from './types'

export const setLanguage = (language: Language) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: ReduxGenericKey.SET_LANGUAGE,
      payload: {
        language
      }
    })
  }

export const resetGeneric = () => (dispatch: Dispatch) => {
  dispatch({
    type: ReduxGenericKey.RESET_GENERIC
  })
}
