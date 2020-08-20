// In GraphQL the Schema manages queries and mutattions, defining what is allowed to be executed in the GraphQl Server. This Schema defines the complete set of possible data that a client can access. The most basic component of a GraphQL schema is an object type, which represents a kind of object we can fetch from our service, and what fields it has. 
// Imports
import { GraphQLSchema } from 'graphql'

// Imports our queries and mutations to abstract away logic
// App Imports
import query from './queries'
import mutation from './mutations'

// Creates the GraphQLSchema using the imported query and mutation
// Schema
const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema
