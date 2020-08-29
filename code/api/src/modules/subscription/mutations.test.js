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
    .send({ query: '{ userLogin(email: "user@crate.com", password: "123456") { user{id email name} token }}'})
    .expect(200)

    token = userLoginDetails.body.data.userLogin.token;
    testUserId = userLoginDetails.body.data.userLogin.user.id;
    testSubscriptions = [
    await models.Subscription.create({ crateId: 1, userId: testUserId }),
    await models.Subscription.create({ crateId: 2, userId: testUserId }),
    await models.Subscription.create({ crateId: 3, userId: testUserId }),
    await models.Subscription.create({ crateId: 1, userId: 1 })
    ]
  });

  afterAll( async() => {
    let latestSub = await models.Subscription.findAll({
      limit: 1,
      order: [ [ 'id', 'DESC' ]]
    })

    latestSub[0].destroy();
    testSubscriptions.forEach(deleteSubscriptions)
    async function deleteSubscriptions(subscription) {
      let sub = await models.Subscription.findOne({ where: {id: subscription.dataValues.id}})
      if(sub != null){
        sub.destroy();
      }
    }
  });

  it('creates a subscription', async () => {
    const response = await request(server)
    .post('/')
    .set('Authorization', `Bearer ${token}`)
    .send({ query: ' mutation{ subscriptionCreate(crateId: 5) { id user{ id name } crate{ id } }}'})
    .expect(200)

    let sub = await models.Subscription.findOne({ where: { id: response.body.data.subscriptionCreate.id}})

    expect(sub.dataValues.crateId).toEqual(5)
    expect(sub.dataValues.userId).toEqual(testUserId)
  })

  it('removes a subscription', async () => {
    const response = await request(server)
    .post('/')
    .set('Authorization', `Bearer ${token}`)
    .send({ query: ` mutation{ subscriptionRemove( id: ${testSubscriptions[1].dataValues.id}) { id } }`})
    .expect(200)

    expect(response.body.data.subscriptionRemove.id).toEqual(null)

    let testSubscription = await models.Subscription.findOne({ where: { id: testSubscriptions[1].dataValues.id}})
    expect(testSubscription).toEqual(null)
  })
})
