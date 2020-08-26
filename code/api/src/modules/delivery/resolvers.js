// App Imports
import models from '../../setup/models'
import params from '../../config/params'

// Get Delivery by ID
export async function getById(parentValue, { deliveryId }) {
  const delivery = await models.Delivery.findOne({ where: { id: deliveryId } })

  if (!delivery) {
    // Delivery doesn't exist
    throw new Error('The delivery you are looking for does not exist')
  } else {
    return delivery
  }
}

// Get all deliveries
export async function getAll(parentValue) {
  return await models.Delivery.findAll()
}

// Create Delivery
export async function create(parentValue, { subscriptionId, deliveryDate }) {
  const delivery = await models.Delivery.create({
    subscriptionId,
    deliveryDate
  })
}

// Update Delivery
export async function update(parentValue, { id, deliveryDate }) {
  return await models.Delivery.update(
    {
      deliveryDate
    },
    { where: id }
  )
}

// Delete Delivery
export async function remove(parentValue, { deliveryId }) {
  return await models.Delivery.destroy({ where: deliveryId })
}
