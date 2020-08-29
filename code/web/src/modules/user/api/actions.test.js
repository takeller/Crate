import * as actions from './actions.js'

describe('actions', () => {
  it('should create an action of type SET_USER', () => {
    const user = {
      type: "AUTH/SET_USER",
      user: {
        name: "test",
        email: "test@notreal.com",
        role: "user",
        id: 1
      }
    }

    const actual = actions.setUser(undefined, user);
    const expected = { type: "AUTH/SET_USER", user };
    expect(actual).toStrictEqual(expected);
  })


  it.skip('should create an action of type LOGOUT', () => {
    const actual = actions.logout();
    const expected = { type: 'LOGOUT' }
    expect(actual).toEqual(expected)

  })

  it.skip('should create an action of type UPDATE_USER', () => {
      const userDetails = {
        name: "test",
        email: "test@notreal.com",
        description: "test description",
        address: 'test address',
        image: 'test image'
      }

    const expectedAction = { type: 'AUTH/UPDATE_USER', userDetails};

    const result = actions.updateUserInfo(userDetails);
    expect(result).toEqual(expectedAction);
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