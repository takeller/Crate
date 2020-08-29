'use strict';

const params = require('../config/params');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('deliveries', [
      {
        subscriptionId: 1,
        deliveryDate: '2020-08-29',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subscriptionId: 2,
        deliveryDate: '2020-08-29',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('deliveries', null, {});
  }
}