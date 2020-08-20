// Imports
import axios from 'axios' //HTTP client library from node and supports promises - alternative to fetch
import { query, mutation } from 'gql-query-builder' //graphQL
import cookie from 'js-cookie' //js api that handles cookies

// App Imports
import { routeApi } from '../../../setup/routes' //api url

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'

// Actions

// Set a user after login or using localStorage token
export function setUser(token, user) {
  if (token) {
   // Alter defaults after instance has been created and sets headers to the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete the token from headers if no token exists
    delete axios.defaults.headers.common['Authorization'];
  }
  // return redux action object
  return { type: SET_USER, user }
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  return dispatch => {// Returns function that requires a dispatch object
    dispatch({ // Dispatch a type: login request to the redux store
      type: LOGIN_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({ // Post a query for the userLogin
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))
      .then(response => {
        let error = ''

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message // If there's an error, store the message
        } else if (response.data.data.userLogin.token !== '') { // If no error, set token and user to the response 
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user

          dispatch(setUser(token, user)) //trigger the change to the set state of User 

          loginSetUserLocalStorageAndCookie(token, user) // saves user to local storage and cookies
        }

        dispatch({ // dispatch a login response to the store
          type: LOGIN_RESPONSE,
          error
        })
      })
      .catch(error => {
        dispatch({ // if there's an error then dispatch error to the store
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token) // Stores token in local storage
  window.localStorage.setItem('user', JSON.stringify(user)) // stores user in local storage

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({ //update the api with the new user's info
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie() // delete user from local storage and cookies

    dispatch({
      type: LOGOUT //logout event to store
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token') 
  window.localStorage.removeItem('user') 

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({ //post the user's gender
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}
