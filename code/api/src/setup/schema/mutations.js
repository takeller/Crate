// Imports
import { GraphQLObjectType } from 'graphql'

// Import * is used to import all exports from a file. We are also using an alias here to describe all of the exports in a variable.
// App Imports
import * as user from '../../modules/user/mutations'
import * as product from '../../modules/product/mutations'
import * as crate from '../../modules/crate/mutations'
import * as subscription from '../../modules/subscription/mutations'

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',
  // Defines all of the mutations available to use. These mutations come in through the import for each table in the database. We then store all of the mutations under the fields.
  fields: {
    // The triple dot is a spread operator and is used to expand the elements of collection. 
    ...user,
    ...product,
    ...crate,
    ...subscription
  }
})

export default mutation
