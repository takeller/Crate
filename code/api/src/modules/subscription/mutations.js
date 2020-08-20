// Mutattions are used for Creating, Updating, and Destroying from the database.
// Imports
import { GraphQLInt } from 'graphql'

// We want the type definitions so GraphQL knows how to structure responses, and resolvers in order to implement the mutattions
// App Imports
import SubscriptionType from './types'
import { create, remove } from './resolvers'

// Creates a new subscription. The return is of the SubscriptionType. Only the crateId is needed as an arg because user data is grabbed from "auth" inside of the create resolver. The create resolver is used to implement this action.
// Subscription create
export const subscriptionCreate = {
  type: SubscriptionType,
  args: {
    crateId: {
      name: 'crateId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Deletes subscription from database. Return is of the SubscriptionType. Only the subscription ID is needed as user data is grabbed from "auth" inside of the remove resolver. The remove resolver is used to implement this action. 
// Subscription remove
export const subscriptionRemove = {
  type: SubscriptionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
