import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
    
    store = createStore(rootReducer, applyMiddleware(thunk))

    const mockUpdateProfile = jest.fn()

    router =
    <Provider store = {store}>
        <MemoryRouter>
            <Form updateProfile = {mockUpdateProfile} />
            <Profile />
        </MemoryRouter>
    </Provider>

    it('Should render the Form component', () => {
        // console.log(props.user)
        // const { getByPlaceholderText, getByRole} = render(router)
    })

    // Reducer example test
    // it('should add a todo', () => {
    //     const action = {type: 'ADD_TODO', text: 'Hello', id: 33};

    //     const expected = [{text: 'Hello', id: 33, completed: false}]

    //     const result = todosReducer([], action);
        
    //     expected(result).toEqual(expected);
    // })


    // Action example test

    // it('should have a type of ADD_TODO', () => {
    // Setup
    // const text = "Go to the Vault";
    // const id = 1;
    // const expectedAction = {
    //   type: 'ADD_TODO',
    //   text: "Go to the Vault",
    //   id: 1
    // };

    // Execution
    // const result = actions.addTodo(text, id);

    // Expectation
    // expect(result).toEqual(expectedAction);
//   });

})    