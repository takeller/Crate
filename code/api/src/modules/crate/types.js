// Import basic GraphQL types
// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Defines the CrateType.
// Crate type
const CrateType = new GraphQLObjectType({
  name: 'crate',
  description: 'Crate Type',

  // Fields required for something to be considered of the CrateType
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default CrateType
