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

  it('should be able to set the user using a reducer', () => {
    const user = {
      type: "AUTH/SET_USER",
      user: {
        name: "test",
        email: "test@notreal.com",
        role: "user",
        id: 1
      }
    }

    const expected = { type: "AUTH/SET_USER", user }
    const result = actions.setUser([], user);
    expect(result).toEqual(expected)
  })   
})