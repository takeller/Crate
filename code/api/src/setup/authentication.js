// This files looks like it is the middleware that handles the authentication in our app
// Imports
import jwt from 'jsonwebtoken'
import serverConfig from '../config/server.json'

// Authentication middleware
export default function (request, response, next) {
  // Grabs authorization token out of the request headers
  let authToken = request.headers.authorization
  // Checks that there is an authToken and that it is not null
  if (authToken && authToken !== null) {
    try {
      // The token must need some formatting here before it is usable
      const token = authToken.split(' ')
      // Verifies that the token is valid
      request.user = jwt.verify(token[1], serverConfig.secret)
    } catch (e) {
      console.warn('Invalid token detected.')
    }
  } else {
    request.user = {}
  }

  next()
}
