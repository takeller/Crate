// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import DeliveryType from './types'
import { getAll, getById } from './resolvers'

// Deliveries All
export const deliveries = {
  type: new GraphQLList(DeliveryType),
  resolve: getAll
}

// Delivery By ID
export const deliveryById = {
  type: DeliveryType,
  args: {
    deliveryId: { type: GraphQLInt }
  },
  resolve: getById
}
