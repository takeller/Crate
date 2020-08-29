// Imports
import { GraphQLInt, GraphQLBoolean } from 'graphql'

// App Imports
import DeliveryProductType from './types'
import { create } from './resolvers'

// DeliveryProduct create
export const deliveryProductCreate = {
  type: DeliveryProductType,
  args: {
    deliveryId: {
      name: 'deliveryId',
      type: GraphQLInt
    },
    productId: {
      name: 'productId',
      type: GraphQLInt
    }
  },
  resolve: create
}