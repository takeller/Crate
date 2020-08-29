import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';
import Profile from './Profile';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

describe("Form", () => {
    let user;
    let router;
    let store
  
    beforeEach(() => {
      
      user = () => {
        return {
            error: null,
            isLoading: false,
            isAuthenticated: true,
            details: {
                name: "Test user", 
                email: "user@crate.com", 
                role: "user",
                address: 'test address',
                description: 'test description',
                image: 'test image'
            }
        }
      }
  
      const appReducer = combineReducers({
        user,
      })
  
      // Root Reducer
      const rootReducer = (state, action) => {
        if (action.type === 'RESET') {
          state = undefined
        }
  
        return appReducer(state, action)
      }
  
    let initialState
        if (typeof window !== 'undefined') {
            initialState = window.__INITIAL_STATE__
            delete window.__INITIAL_STATE__
        }   

      store = createStore(rootReducer, applyMiddleware(thunk))
    
      const mockUpdateProfile = jest.fn()
    
      router =
      <Provider store={store}>
        <MemoryRouter>
          <Form updateUserInfo={mockUpdateProfile}/>
          <Profile />
        </MemoryRouter>
      </Provider>
    })

  it('Should render the Form component', () => {
    const { getByText } = render(router)
    expect(getByText('Update your profile using the form below!')).toBeInTheDocument();
  })
  
})  

