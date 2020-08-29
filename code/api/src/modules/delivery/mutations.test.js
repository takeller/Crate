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
    let latestDelivery = await models.Delivery.findOne({ where: { deliveryDate: "11/10/2020" }})
    latestDelivery.destroy();

    testDeliveries.forEach(deleteDelivery)
    async function deleteDelivery(delivery) {
      let deliveryToDelete = await models.Delivery.findOne({ where: { id: delivery.dataValues.id}})
      if(deliveryToDelete != null){
        deliveryToDelete.destroy();
      }
    }

    let sub = await models.Subscription.findOne({ where: {id: testSubscription.id}})
    sub.destroy();
  });

  it('creates a delivery', async() => {
    const response = await request(server)
    .post('/')
    .send({ query: ` mutation{ deliveryCreate(subscriptionId: ${testSubscription.id}, deliveryDate: "11/10/2020") { id deliveryDate }}`})
    .expect(200)

    let newDelivery = response.body.data.deliveryCreate
    expect(newDelivery.id).toBeGreaterThan(0)
    expect(newDelivery.deliveryDate).toEqual("11/10/2020")
  })

  it('Updates a delivery', async() => {
    const response = await request(server)
    .post('/')
    .send({ query: ` mutation{ deliveryUpdate(id: ${testDeliveries[0].dataValues.id}, deliveryDate: "5/2/2020") { id deliveryDate } }`})
    .expect(200)

    let updatedDelivery = response.body.data.deliveryUpdate
    expect(updatedDelivery.id).toEqual(testDeliveries[0].dataValues.id)
    expect(updatedDelivery.deliveryDate).toEqual("5/2/2020")
  })

  it('Deletes a delivery', async() => {
    const response = await request(server)
    .post('/')
    .send({ query: ` mutation{ deliveryRemove(id: ${testDeliveries[1].dataValues.id}) { id }}`})
    .expect(200)

    let removedDelivery = await models.Delivery.findOne({ where: { id: testDeliveries[1].dataValues.id } })
    expect(removedDelivery).toEqual(null)
  })
})
