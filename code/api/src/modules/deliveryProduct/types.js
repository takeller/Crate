// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql'

// App Imports
import { DeliveryType } from '../delivery/types'
import ProductType from '../product/types'

// DeliveryProduct type
const DeliveryProductType = new GraphQLObjectType({
  name: 'deliveryProduct',
  description: 'DeliveryProduct Type',

  fields: () => ({
    id: { type: GraphQLInt },
    delivery: { type: DeliveryType },
    product: { type: ProductType },
    returned: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default DeliveryProductType