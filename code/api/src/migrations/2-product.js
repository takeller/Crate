module.exports = {
  up: (queryInterface, Sequelize) => {
    //product table is created
    return queryInterface.createTable('products', {
      id: {
        //can't be null
        allowNull: false,
        autoIncrement: true,
        //id = primary key
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //product attributes
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
      //timestamps
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
  //rollback migration
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
}
