// Queries are used for reading data from the database (get)
// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// Import the GraphQL SubscriptionType and relevent resolvers
// App Imports
import SubscriptionType from './types'
import { getAll, getByUser, get } from './resolvers'

// Grabs all subscriptions from the database. Returns will be a GraphQl list with elements of the SubscriptionType. Uses the getAll resolver.
// Subscriptions All
export const subscriptions = {
  type: new GraphQLList(SubscriptionType),
  resolve: getAll
}

// Grabs all subscriptions for a specific user. Doesn't need an argument because user data is grabbed from "auth" in the getByUser resolver. The return is a graphQLList with elements of the SubscriptionType
// Subscriptions by user
export const subscriptionsByUser = {
  type: new GraphQLList(SubscriptionType),
  resolve: getByUser
}

// Grabs a single ID based on its ID. Return is of the SubscriptionType. Takes an arg of ID to find the subscription. Uses the get resolver. 
// Subscription By id
export const subscription = {
  type: SubscriptionType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: get
}
