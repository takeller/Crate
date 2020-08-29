'use strict';

const params = require('../config/params');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('deliveryProducts', [
      {
        deliveryId: 1,
        productId: 2,
        returned: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        deliveryId: 1,
        productId: 4,
        returned: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        deliveryId: 2,
        productId: 1,
        returned: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        deliveryId: 2,
        productId: 3,
        returned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('deliveryProducts', null, {});
  }
}