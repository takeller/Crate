import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'

describe('user mutations', () => {
  let server;

  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false,
      })
    )
  })

  it('creates a user', async () => {
    const response = await request(server)
    .post('/')
    .send({ query: ' mutation{ userSignup(name: "Test Name", email: "test@email.com", password: "test") { email name }}' })
    // .expect(200)
    console.log(response.body)

    expect(response.body.data.userSignup.email).toEqual('test@email.com')
    expect(response.body.data.userSignup.name).toEqual('Test Name')
  })
})

// Needs to add teardown! 
