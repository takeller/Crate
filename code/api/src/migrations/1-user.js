// Migration to add the User table to the database.
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Creates users tables
    return queryInterface.createTable('users', {
      id: {
        // ID is required
        allowNull: false,
        // Primary Key so we increment
        autoIncrement: true,
        primaryKey: true,
        // ID is stored as an integer
        type: Sequelize.INTEGER
      },
      // Bellow are the user attributes
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.TEXT
      },
      // Time Stamps
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
  // Used to rollback the migration.
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
}
