// Queries are used for reading information from the database (get)
// Imports
import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// Import relevent resolvers and types.
// App Imports
import { ProductType, ProductTypesType } from './types'
import { getAll, getBySlug, getById, getRelated, getTypes } from './resolvers'

// Query to grab all products form database. Return will be a GraphQLList with elements of the ProductType. Uses the getAll resolver to complete this query.
// Products All
export const products = {
  type: new GraphQLList(ProductType),
  resolve: getAll
}

// Query to grab all a single product from the database based on a slug. Return will be of the ProductType. Uses the getBySlug resolver to complete this query.
// Product By slug
export const product = {
  type: ProductType,
  args: {
    slug: { type: GraphQLString }
  },
  resolve: getBySlug
}

// Query to grab all a single product from the database based on an ID. Return will be of the ProductType. Uses the getById resolver to complete this query.
// Product By ID
export const productById = {
  type: ProductType,
  args: {
    productId: { type: GraphQLInt }
  },
  resolve: getById
}

// Query to grab products related to a product that is found by its productId. Return will be a GraphQLList with elements of the ProductType. Uses the getRelated resolver to complete this query.
// Products Related
export const productsRelated = {
  type: new GraphQLList(ProductType),
  args: {
    productId: { type: GraphQLInt }
  },
  resolve: getRelated
}

// Query to grab all product types. Return will be a GraphQLList with elements of the ProductTypesType. Uses the getTypes resolver to compelte this query. 
// Product Types
export const productTypes = {
  type: new GraphQLList(ProductTypesType),
  resolve: getTypes
}
