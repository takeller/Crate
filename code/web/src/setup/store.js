// Imports
import { compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
//state tree = state, action - object, 

// App Imports
import common from '../modules/common/api/state'
import user from '../modules/user/api/state'
import * as product from '../modules/product/api/state'
import * as subscription from '../modules/subscription/api/state'
import * as crate from '../modules/crate/api/state'

// App Reducer
const appReducer = combineReducers({ //combines reducers which are what determines changes to state
  common,
  user,
  ...product,
  ...subscription,
  ...crate
})

// Root Reducer
export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

// Load initial state from server side
let initialState
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}

// Store
export const store = createStore(
  rootReducer,
  initialState,

  composeWithDevTools(
    //With the regular Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extends the store's abilities, and lets you write async logic that interacts with the store.
    //thunk = function
    // thunks enable us to avoid directly causing side effects in our actions, action creators, or components
    applyMiddleware(thunk),
  )
)