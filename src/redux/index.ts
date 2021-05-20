import { createStore, applyMiddleware, combineReducers, AnyAction } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { GenericReducer } from './Modules/Generic/types'
import requestReducer from './Modules/Request/Reducer'
import genericReducer from './Modules/Generic/Reducer'
import { ReducerRequest } from './Modules/Request/types'

export type CubbitReduxStore = {
  request: ReducerRequest,
  generic: GenericReducer
}

export const store = createStore(
  combineReducers<CubbitReduxStore>({
    request: requestReducer,
    generic: genericReducer
  }),
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  )
)

export type GetReduxState = () => CubbitReduxStore