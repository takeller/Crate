// Resolvers map an operation to an actual function.

// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// This is where we are creating a user from a signup form. First we check if a user exists with the given email. If no user exists we go ahead and create a user using the arguments of name, email, and password. Password is secured using bcrypt.
// Create
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

// Authenticating and logging in a user
export async function login(parentValue, { email, password }) {
  // First we check to see if this user exists
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    // Compare the given password vs what is stored in the database. This is passed through a hash table using bcrypt
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    // Knowing that a user exists, we now verify that the password is a match.
    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      // A user exisits and provided the correct password. Here we define the details that we are going to return.
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      // Returning
      // Why do we return both userDetails and UserDetailsToken?
      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// Query to grab a single user
// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// Query to grab all users
// Get all
export async function getAll() {
  return await models.User.findAll()
}

// Mutation to delete a user
// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// Query to grab a users gender
// User genders
export async function getGenders() {
  return Object.values(params.user.gender)
}
