// Queries are used for Reading (get) information from the database
// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// Grabs the CrateType definition and relevent resolvers
// App Imports
import CrateType from './types'
import { getAll, getById } from './resolvers'

// Query to grab all Crates. An arg can be passed in to order the Crates returned. THis query is implemented using the getAll resolver
// Crates All
export const crates = {
  type: new GraphQLList(CrateType),
  args: {
    orderBy: { type: GraphQLString }
  },
  resolve: getAll
}

// Query to grab a single crate by an ID. An arg of ID is passed in to find the relvent crate. This query is implemented using the getById resolver. 
// Crate By ID
export const crateById = {
  type: CrateType,
  args: {
    crateId: { type: GraphQLInt }
  },
  resolve: getById
}
