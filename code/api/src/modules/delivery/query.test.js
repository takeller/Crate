import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import authentication from '../../setup/authentication'

describe('subscription queries', () => {
  let server;
  let token;
  let testSubscription;
  let testDeliveries;

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
    .send({ query: '{ userLogin(email: "user@crate.com", password: "123456") { user{email name id} token }}'})
    .expect(200)

    token = userLoginDetails.body.data.userLogin.token;
    let userId = userLoginDetails.body.data.userLogin.user.id;
    testSubscription = await models.Subscription.create({ crateId: 1, userId: userId })
    testSubscription = testSubscription.dataValues

    testDeliveries = [
      await models.Delivery.create( { subscriptionId: testSubscription.id, deliveryDate: "9/10/2020" }),
      await models.Delivery.create( { subscriptionId: testSubscription.id, deliveryDate: "10/10/2020" })
    ]
  })

  afterAll( async() => {
    let sub = await models.Subscription.findOne({ where: {id: testSubscription.id}})
    sub.destroy()

    testDeliveries.forEach(deleteDelivery)
    async function deleteDelivery(delivery) {
      let deliveryToDelete = await models.Delivery.findOne({ where: { id: delivery.dataValues.id}})
      if(deliveryToDelete != null){
        deliveryToDelete.destroy();
      }
    }
  });

  it('returns all deliveries', async () => {
    const response = await request(server)
    .get('/')
    .send({ query: '{ deliveries { id deliveryDate subscription { id } }}'})
    .expect(200)

    let deliveries = response.body.data.deliveries
    expect(deliveries.length).toEqual(2)
    expect(deliveries[0].subscription.id).toEqual(testSubscription.id)
    expect(deliveries[0].deliveryDate).toEqual(testDeliveries[0].dataValues.deliveryDate)
  })

  it('returns a delivery by Id', async () => {
    const response = await request(server)
    .get('/')
    .send({ query: `{ deliveryById( deliveryId: ${testDeliveries[0].dataValues.id}) { id deliveryDate subscription { id } }}`})
    .expect(200)

    let delivery = response.body.data.deliveryById
    expect(delivery.id).toEqual(testDeliveries[0].dataValues.id)
    expect(delivery.subscription.id).toEqual(testSubscription.id)
  })
})
