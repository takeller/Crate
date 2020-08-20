// Mutations are Creating, Updating, and Destroying from the database

// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// Import the ProductType and relevent resolvers
// App Imports
import { ProductType } from './types'
import { create, update, remove } from './resolvers'

// Creates a new product. The return will be of the ProductType. Takes a handful of args describing the product. The create resolver is used to implement this mutation.
// Product create
export const productCreate = {
  type: ProductType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    slug: {
      name: 'slug',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    type: {
      name: 'type',
      type: GraphQLInt
    },

    gender: {
      name: 'gender',
      type: GraphQLInt
    },

    image: {
      name: 'image',
      type: GraphQLString
    }
  },
  resolve: create
}

// Mutation to update a product. The return will be of the ProductType. Takes in args that will be used to modify product attributes. The update resolver is used to complete this mutation.
// Product update
export const productUpdate = {
  type: ProductType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    name: {
      name: 'name',
      type: GraphQLString
    },

    slug: {
      name: 'slug',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    type: {
      name: 'type',
      type: GraphQLInt
    },

    gender: {
      name: 'gender',
      type: GraphQLInt
    },

    image: {
      name: 'image',
      type: GraphQLString
    }
  },
  resolve: update
}

// Mutation to remove a product from the database. The return will be of the ProductType. Takes in an argument of productId. Uses the remove resolver to complete the mutation. 
// Product remove
export const productRemove = {
  type: ProductType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
