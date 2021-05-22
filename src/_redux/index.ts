import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { GenericReducer } from '_redux/Modules/Generic/types'
import requestReducer from '_redux/Modules/Request/Reducer'
import genericReducer from '_redux/Modules/Generic/Reducer'
import { ReducerRequest } from '_redux/Modules/Request/types'
import fileReduced from '_redux/Modules/File/Reducer'
import { FileReducer } from '_redux/Modules/File/types'

export type CubbitReduxStore = {
  request: ReducerRequest,
  generic: GenericReducer,
  file: FileReducer
}

export const store = createStore(
  combineReducers<CubbitReduxStore>({
    request: requestReducer,
    generic: genericReducer,
    file: fileReduced
  }),
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  )
)

export type GetReduxState = () => CubbitReduxStore
