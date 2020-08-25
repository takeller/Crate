module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('deliveries', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        subscriptionId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'subscriptions',
            key: 'id'
          },
          allowNull: false
        },
        deliveryDate: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('deliveries');
  }
}
