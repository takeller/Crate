import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import Form from "./Form";
import Profile from "./Profile";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


describe('Form', () => {

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

    const appReducer = combineReducers({
        user
    })

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
    <Provider store = {store}>
        <MemoryRouter>
            <Form updateUserInfo = {mockUpdateProfile} />
            <Profile />
        </MemoryRouter>
    </Provider>

    it.skip('Should render the Form component', () => {
        const { getByPlaceHolderText } = render(router)
        expect(getByPlaceHolderText('upload image')).toBeInTheDocument()
    })
})    