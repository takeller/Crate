import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import Profile from "./Profile";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

describe('Profile', () => {
    let user;
    let router;
    let store;

    beforeEach(() => {
        user = () => {
            return {
                error: null, 
                isLoading: false, 
                isAuthenticated: true, 
                details: {
                    name: 'Test User',
                    email: 'test@crate.com',
                    role: 'user',
                    address: '123 Fake St.',
                    image: '',
                    description: 'test user',
                    id: '4'
                }
            }
        }
    })

    const appReducer = combineReducers({ user })
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

    it.skip('Should render the Profile component', () => {
        const { getByText } = render(<Provider store={store}><Profile /></Provider>);
        expect(getByText('Profile')).toBeInTheDocument();
    })


})   