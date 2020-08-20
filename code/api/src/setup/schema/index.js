//schema defines what's allowed in the graphQL server
// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './queries'
import mutation from './mutations'

// Schema
// Creates schema using the imported query and mutation
const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema
