// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State
export const userInitialState = { //set initial state for the app
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
export default (state = userInitialState, action) => {
  switch (action.type) { //switch statement looking through the imports on line 3
    case SET_USER: //set user details
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user), //boolean if a user is logged in
        details: action.user, //sets user details
      }

    case LOGIN_REQUEST: // api login request
      return {
        ...state,
        error: null,
        isLoading: action.isLoading //set loading to ture
      }

    case LOGIN_RESPONSE: // get response
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case LOGOUT: //logs user out and sets state back to initial state
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

    default:
      return state // if nothing matches the criteria then do nothing
  }
}