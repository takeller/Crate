// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import DeliveryType from './types'
// import { ... } from './resolvers'

// Deliveries All
export const deliveries = {
  type: new GraphQLList(DeliveryType),
  resolver: getAll
}

// Delivery By user
export const deliveriesByUser = {
  type: new GraphQLList(DeliveryType),
  resolver: getByUser
}
