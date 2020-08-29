// App Imports
import models from '../../setup/models'
import params from '../../config/params'
const { Op } = require("sequelize");

// Get Delivery by ID
export async function getById(parentValue, { deliveryId }) {
  const delivery = await models.Delivery.findOne({ where: { id: deliveryId }, include: [ { model: models.Subscription, as: 'subscription' },]})

  if (!delivery) {
    // Delivery doesn't exist
    throw new Error('The delivery you are looking for does not exist')
  } else {
    return delivery
  }
}

// Get deliveries by userId
export async function getAllByUserId(parentValue, { userId }) {
  let deliveries = await models.Delivery.findAll({
    where: { '$subscription.user.id$': userId },
    include: { all: true, nested: true }
  })
  return deliveries
}

// Get all deliveries
export async function getAll(parentValue) {
  return await models.Delivery.findAll({
    include: [
      { model: models.Subscription, as: 'subscription' },
    ]
  })
}

// Create Delivery
export async function create(parentValue, { subscriptionId, deliveryDate }) {
  return await models.Delivery.create({
    subscriptionId,
    deliveryDate
  })
}

// Update Delivery
export async function update(parentValue, { id, deliveryDate }) {
  await models.Delivery.update(
    {
      deliveryDate
    },
    { where: {id} }
  )
  return await models.Delivery.findOne({ where: { id } })
}

// Delete Delivery
export async function remove(parentValue, { id }) {
  return await models.Delivery.destroy({ where: { id } })
}
