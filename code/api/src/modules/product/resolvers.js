// Resolvers implement the logic to interact with the database
// App Imports
import params from '../../config/params'
import models from '../../setup/models'

// Grabs all products ordered by the product ID.
// Get all products
export async function getAll() {
  return await models.Product.findAll({ order: [['id', 'DESC']] })
}

// Grabs a single product based on its slug.
// Get product by slug
export async function getBySlug(parentValue, { slug }) {
  const product = await models.Product.findOne({ where: { slug } })
  // Toss and error if the product is not found in the database
  if (!product) {
    // Product does not exists
    throw new Error('The product you are looking for does not exists or has been discontinued.')
  } else {
    return product
  }
}

// Grab a single product based on its ID. Takes in an argument of productId.
// Get product by ID
export async function getById(parentValue, { productId }) {
  const product = await models.Product.findOne({ where: { id: productId } })

  // Toss and error if the product doesn't exist
  if (!product) {
    // Product does not exists
    throw new Error('The product you are looking for does not exists or has been discontinued.')
  } else {
    return product
  }
}

// Grab products related to a product that is identified by its ID.
// Get related products
export async function getRelated(parentValue, { productId }) {
  return await models.Product.findAll({
    where: {
      // Not quite sure what Sequelize.Op.not is doing
      id: { [models.Sequelize.Op.not]: productId }
    },
    // Looks like the related products functionality is not built out, but is instead currently mocked to show random products
    limit: 3,
    order: [[models.Sequelize.fn('RAND')]] // mock related products by showing random products
  })
}

// Works with a mutation to add a product to the database. Takes in several arguments that define the product. The user must be currently logged in and of the admin role in order to successfully complete this action.
// Create product
export async function create(parentValue, { name, slug, description, type, gender, image }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.create({
      name,
      slug,
      description,
      type,
      gender,
      image
    })
  } else {
    // Toss error if the user is not logged in or not an admin
    throw new Error('Operation denied.')
  }
}

// Works with a mutation to update a product. Finds the product based on an ID. The product is the updated according to the arguments. User must be currently logged in and an admin.
// Update product
export async function update(parentValue, { id, name, slug, description, type, gender, image }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.update(
      {
        name,
        slug,
        description,
        type,
        gender,
        image
      },
      { where: { id } }
    )
  } else {
    // Toss error if the user is not logged in or not an admin
    throw new Error('Operation denied.')
  }
}

// Works with a mutation to remove a product from the database. Takes in ID as an argument from the mutation. User must be logged in and an admin.
// Delete product
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    const product = await models.Product.findOne({where: {id}})

    // Toss error if a product with the passed in ID doesn't exist.
    if (!product) {
      // Product does not exists
      throw new Error('The product does not exists.')
    } else {
      return await models.Product.destroy({where: {id}})
    }
  } else {
    // Toss error if user is not logged in or isn't an admin
    throw new Error('Operation denied.')
  }
}

// Finds the product types from the config/params.json file
// Product types
export async function getTypes() {
  return Object.values(params.product.types)
}
