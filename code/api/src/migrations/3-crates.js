// Migration to add Crates to the database
module.exports = {
  // Creates Crate Table
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('crates', {
      id: {
        // ID is required
        allowNull: false,
        // We increment because ID is the Primary key
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // Crate attributes
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      // Timestamps
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
    return queryInterface.dropTable('crates');
  }
}
