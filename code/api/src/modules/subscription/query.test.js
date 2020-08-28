import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import authentication from '../../setup/authentication'

describe('subscription queries', () => {
  let server;
  let token;
  let testSubscriptions;

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
    let userId = userLoginDetails.body.data.userLogin.user.id;
    testSubscriptions = [
    models.Subscription.create({ crateId: 1, userId: userId }),
    models.Subscription.create({ crateId: 2, userId: userId }),
    models.Subscription.create({ crateId: 3, userId: userId }),
    models.Subscription.create({ crateId: 1, userId: 1 })
    ]
  })

  it('returns all subscriptions', async () => {
    const response = await request(server)
    .get('/')
    .send({ query: '{ subscriptions { id user{ id } crate { id }}}'})
    .expect(200)

    expect(response.body.data.subscriptions.length).toEqual(4)
  })

  it('returns subscriptions by user', async () => {
    const response = await request(server)
    .get('/')
    .send({ query: '{ subscriptionsByUser { crate{ id } }}'})
    .expect(200)

    expect(response.body.data.subscriptionsByUser.length).toEqual(3)
  })

  it('returns subscription by id', async () => {
    const response = await request(server)
    .get('/')
    .send({ query: `{ subscription(id: ${testSubscriptions[0].id}) { id crate{ id } user{ id } }}`})
    .expect(200)

    expect(response.body.data.subscription.id).toEqual(testSubscriptions[0].id)
    expect(response.body.data.subscription.crate.id).toEqual(testStestSubscriptions[0].crate.id)
    expect(response.body.data.subscription.user.id).toEqual(testStestSubscriptions[0].user.id)
  })
})
