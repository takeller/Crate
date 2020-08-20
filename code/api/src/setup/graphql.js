// Creates the GraphQL endpoint for use by our API
// Imports
import graphqlHTTP from 'express-graphql'

// App Imports
import serverConfig from '../config/server.json'
import authentication from './authentication'
import schema from './schema'

// Setup GraphQL
export default function (server) {
  console.info('SETUP - GraphQL...')

  // Looks like this is where our server uses the authentication standards set in the authentication.js file
  server.use(authentication)

  // Creates link between our server(express) and the GraphQl API. Look at /config/server.json for details.
  // API (GraphQL on route `/`)
  server.use(serverConfig.graphql.endpoint, graphqlHTTP(request => ({
    schema,
    // Not sure what these next two lines do. 
    graphiql: serverConfig.graphql.ide,
    pretty: serverConfig.graphql.pretty,
    context: {
      auth: {
        // Authentication details used in many resolvers. User is the user defined in the http request, and we check to see if they are authenticated.
        user: request.user,
        isAuthenticated: request.user && request.user.id > 0
      }
    }
  })))
}
