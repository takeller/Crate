// Resolvers to implement queries and mutations
// App Imports
import models from '../../setup/models'

// Grabs the subscription from the database that matches the given ID.
// Get subscription by ID
export async function get(parentValue, { id }) {
  return await models.Subscription.findOne({
    where: { id },
    // This request will return user and create associated with this subscription
    include: [
      { model: models.User, as: 'user' },
      { model: models.Crate, as: 'crate' },
    ]
  })
}

// Finds all subscriptions that a user is current subscribed to.
// Get subscription by user
export async function getByUser(parentValue, {}, { auth }) {
  // Checks that the user is logged in as a valid user from our database
  if(auth.user && auth.user.id > 0) {
    return await models.Subscription.findAll({
      // Finds all subscriptions where the subscription userId == the given userId
      where: {
        userId: auth.user.id
      },
      // The request also includes data on the user and the crate associated with the subscription
      include: [
        {model: models.User, as: 'user'},
        {model: models.Crate, as: 'crate'},
      ]
    })
  } else {
    // If this user is not currently logged in. Toss an error requestion they log in to view subscriptions
    throw new Error('Please login to view your subscriptions.')
  }
}

// Grab all subscirptions from the database. Also includes the user and crate associated with the subscription
// Get all subscriptions
export async function getAll() {
  return await models.Subscription.findAll({
    include: [
      { model: models.User, as: 'user' },
      { model: models.Crate, as: 'crate' },
    ]
  })
}

// Works with a mutation to add a subscription to the database. Takes in an argument of crateId and uses auth to grab data about the user.
// Create subscription
export async function create(parentValue, { crateId }, { auth }) {
  // Checks that the user is logged in and a valid user form our database
  if(auth.user && auth.user.id > 0) {
    // Creates a new subscription in the database. Needs a valid crateId
    return await models.Subscription.create({
      crateId,
      userId: auth.user.id
    })
  } else {
    // Toss and error if the user is not currently logged in.
    throw new Error('Please login to subscribe to this crate.')
  }
}

// Works with a mutation to delete a subscription from the database. Takes in an argument of ID to find the relevent subscription, and uses auth for data about the current user.
// Delete subscription
export async function remove(parentValue, { id }, { auth }) {
  // User must be logged in and in our database
  if(auth.user && auth.user.id > 0) {
    // Deletes the subscription that matches the given ID and is associated with the current user
    return await models.Subscription.destroy({where: {id, userId: auth.user.id}})
  } else {
    // Toss an error if the user is not associated with the relevent subscription
    throw new Error('Access denied.')
  }
}
