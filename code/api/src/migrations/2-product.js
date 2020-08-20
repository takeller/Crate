// Migration that adds the products table to the database
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Create products table
    return queryInterface.createTable('products', {
      id: {
        // ID is required
        allowNull: false,
        // Increments because it is a primaryKey
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // Product attributes
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.INTEGER
      },
      image: {
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
  // used to rollback the migration
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
}
