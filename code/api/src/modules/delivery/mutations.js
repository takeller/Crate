// Imports
import { GraphQLInt, GraphQLString } from 'graphql'

// App Imports
import DeliveryType from './types'
import { create, update, remove } from './resolvers'

// Delivery Create
export const deliveryCreate = {
  type: DeliveryType,
  args: {
    deliveryDate: {
      name: 'deliveryDate',
      type: GraphQLString
    },

    subscriptionId: {
      name: 'subscriptionId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Delivery Update
export const deliveryUpdate = {
  type: DeliveryType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    deliveryDate: {
      name: 'deliveryDate',
      type: GraphQLString
    }
  },
  resolve: update
}

// Delivery Remove
export const deliveryRemove = {
  type: DeliveryType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
