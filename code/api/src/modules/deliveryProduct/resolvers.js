// App Imports
import models from '../../setup/models'

// Create DeliveryProduct
export async function create(parentValue, { deliveryId, productId }) {
  console.log('hello world')
  return await models.DeliveryProduct.create({
    deliveryId,
    productId
  })
}

// Get KeptDeliveryProducts by User
export async function getKept(parentValue, { userId }) {
  return await models.DeliveryProduct.findAll({
    where: {
      '$deliveryProduct.delivery.subscription.user.id$': userId,
      returned: false
    },
    include: { all: true, nested: true },
  })
}