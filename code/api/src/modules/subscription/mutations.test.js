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
  let testUserId;

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
    testUserId = userLoginDetails.body.data.userLogin.user.id;
    testSubscriptions = [
    models.Subscription.create({ crateId: 1, userId: testUserId }),
    models.Subscription.create({ crateId: 2, userId: testUserId }),
    models.Subscription.create({ crateId: 3, userId: testUserId }),
    models.Subscription.create({ crateId: 1, userId: 1 })
    ]
  })

  it('creates a subscription', async () => {
    const response = await request(server)
    .post('/')
    .set('Authorization', `Bearer ${token}`)
    .send({ query: ' mutation{ subscriptionCreate(crateId: 5) { user{ id name } crate{ id } }}'})
    .expect(200)

    expect(response.body.data.subscriptionCreate.crate.id).toEqual(5)
    expect(response.body.data.subscriptionCreate.user.id).toEqual(testUserId)
  })

  it('removes a subscription', async () => {
    const response = await request(server)
    .post('/')
    .set('Authorization', `Bearer ${token}`)
    .send({ query: ` mutation{ subscriptionRemove( id: ${testSubscriptions[1]}) { id } }`})
    .expect(200)

    expect(response.body.data.subscriptionRemove.id).toEqual(null)

    let allSubscriptions = models.Subscription.findAll()
    expect(testSubscriptions.length - allSubscriptions.length).toEqual(1)
  })
})
