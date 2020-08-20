// This file is used to define the ways in which GraphQl will be used to modify data in the database. I think of these as similar to a Post or Patch in REST

// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove } from './resolvers'

// Defines the process by which a new user is created in our database. It also calls the create resolver to handle the logic.
// Create
export const userSignup = {
  // The type of object to be created is of UserType. This is defined in user/types.js
  type: UserType,
  // The args are used to pass user attributes to the database
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}

// Logic that is used to delete a user from the database.
// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
