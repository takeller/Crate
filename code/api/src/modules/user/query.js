// Queries are similar to get requests in REST. These will be used to retrieve data from the database.

// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import { User Type, UserLoginType, UserGenderType } from './types'
import { getAll, getById, login, getGenders } from './resolvers'

// Grabbing all users in the database
// All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}

// Grabbing a single user by their ID will return a UserType
// By ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
}

// Used to determine valid login credentials. This query passes in the args and uses the login resolver to process logic. It is of the UserLoginType, so it must adhere to that structure.
// Auth
export const userLogin = {
  type: UserLoginType,
  // Args here defines the arguments that the UserLoginType accepts
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    },

    role: {
      name: 'role',
      type: GraphQLString
    }
  },
  resolve: login
}

// Used for determining a users gender
// Genders
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}
