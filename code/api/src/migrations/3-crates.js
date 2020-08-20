module.exports = {
  up: (queryInterface, Sequelize) => {
    //create crates table
    return queryInterface.createTable('crates', {
      id: {
        //id is required
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //table attributes
      name: {
        type: Sequelize.STRING
      },
      description: {
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
    return queryInterface.dropTable('crates');
  }
}
