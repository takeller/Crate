// Migration to add the subscription table to the database. Subscriptions are a joins table the establish the many-to-many relationship between crates and users
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Creates subscriptions table
    return queryInterface.createTable('subscriptions', {
      id: {
        // ID is required
        allowNull: false,
        // We increment because ID is the primary Key
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // UserId is required as subscriptions is a joins table
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      // CreateId is required as subscriptions is a joins table
      crateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crates',
          key: 'id'
        },
        allowNull: false
      },
      // Time stamps
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
  // Used to rollback the migration
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subscriptions');
  }
}
