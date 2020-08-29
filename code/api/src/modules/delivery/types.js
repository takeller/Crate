// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import SubscriptionType from '../subscription/types'

// Delivery Type
const DeliveryType = new GraphQLObjectType({
  name: 'delivery',
  description: 'Delivery Type',

  fields: () => ({
    id: { type: GraphQLInt },
    subscription: { type: SubscriptionType },
    deliveryDate: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default DeliveryType
