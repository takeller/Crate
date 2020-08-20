// Mutations for Creating, Updating, and Destroying
// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// Imports out resolver functions and the CrateType object
// App Imports
import CrateType from './types'
import { create, remove, update } from './resolvers'

// Mutation to create a new Crate. Expects a return of the CrateType. We pass in args of name and description. This action is implemented with the create resolver.
// Crate create
export const crateCreate = {
  type: CrateType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: create
}

// Mutation to update a Crate's attributes. Expects a return of the CrateType. This mutation tags args of Id, Name, and Descirption. This action is implemented using the update resolver.
// Crate update
export const crateUpdate = {
  type: CrateType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: update
}

// Mutation to delete a Crate from the database. This mutation expects a return of the CrateType. An arg of ID is used to find the crate to be deleted. This mutation is implemented with the remove resolver. 
// Crate remove
export const crateRemove = {
  type: CrateType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
