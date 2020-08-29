// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import DeliveryProductType from './types'
import { getKept } from './resolvers'

// DeliveryProduct Kept
export const KeptdeliveryProduct = {
  type: new GraphQLList(DeliveryProductType),
  resolve: getKept
}