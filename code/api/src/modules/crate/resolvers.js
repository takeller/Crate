// App Imports
import models from '../../setup/models'
import params from '../../config/params'

// Find a crate based on it's ID
// Get crate by ID
export async function getById(parentValue, { crateId }) {
  const crate = await models.Crate.findOne({ where: { id: crateId } })

  // If a create with this ID doesn't exist, throw an error
  if (!crate) {
    // Crate does not exists
    throw new Error('The crate you are looking for does not exists or has been discontinued.')
  } else {
    return crate
  }
}

// Function to get all crates ordered by their ID
// Get all crates
export async function getAll(parentValue, { orderBy }) {
  return await models.Crate.findAll({ order: [['id', orderBy]] })
}

// Function the works with a mutation to create a new Crate
// Create crate
export async function create(parentValue, { name, description }, { auth }) {
  // Check if the current user is an admin
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.create({
      name,
      description
    })
    // Throw an error if a non admin attempts to create a new Crate
  } else {
    throw new Error('Operation denied.')
  }
}

// Function that works with a mutation in order to update a Crate's attributes.
// Update crate
export async function update(parentValue, { id, name, description }, { auth }) {
  // Checks if the user is an admin
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.update(
      // Updates a Crates name and description where the Crates ID matches the ID passed in to the function
      {
        name,
        description
      },
      {where: {id}}
    )
  } else {
    throw new Error('Operation denied.')
  }
}

// Works with a mutation to remove a Crate from the database. A user must be an admin in order to Delete a Crate.
// Delete crate
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.destroy({where: {id}})
  } else {
    throw new Error('Operation denied.')
  }
}
