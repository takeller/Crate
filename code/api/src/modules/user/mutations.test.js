import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import authentication from '../../setup/authentication'

describe('user mutations', () => {
  let server;
  let token;

  beforeAll( async () => {
    server = express();
    server.use(authentication);

    server.use(
      '/',
      graphqlHTTP( request => ({
        schema: schema,
        graphiql: false,
        context: {
          auth: {
            user: request.user,
            isAuthenticated: request.user && request.user.id > 0
          }
        }
      }))
    );

    let userLoginDetails = await request(server)
    .get('/')
    .send({ query: '{ userLogin(email: "user@crate.com", password: "123456") { user{email name} token }}'})
    .expect(200)

    token = userLoginDetails.body.data.userLogin.token;
  });

  afterAll( async() => {
    let user = await models.User.findOne({ where: { email: "test@email.com" } })
    return user.destroy();
  });

  it('creates a user', async () => {
    const response = await request(server)
    .post('/')
    .send({ query: ' mutation{ userSignup(name: "Test Name", email: "test@email.com", password: "test") { email name }}' })
    .expect(200)

    expect(response.body.data.userSignup.email).toEqual('test@email.com')
    expect(response.body.data.userSignup.name).toEqual('Test Name')
  });

  it('updates a user', async () => {
    const response = await request(server)
    .post('/')
    .set('Authorization', `Bearer ${token}`)
    .send({ query: ' mutation{ userUpdate(description: "Test Description", address: "Test Address") { name email description address }}'})
    .expect(200)

    expect(response.body.data.userUpdate.description).toEqual('Test Description')
    expect(response.body.data.userUpdate.address).toEqual('Test Address')
  })
})
