// App Imports
import models from '../../setup/models'

// Get DeliveryProducts by Kept
export async function get(parentValue, { id }) {
  return await models.DeliveryProduct.findAll({
    where: {
      userId: auth.user.id
    },
    include: [
      { model: models.Delivery, as: 'delivery' },
      { model: models.Product, as: 'product' },
    ]
  })
}