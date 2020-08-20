module.exports = {
  up: (queryInterface, Sequelize) => {
    //creates user table
    return queryInterface.createTable('users', {
      id: {
        //id is required
        allowNull: false,
        autoIncrement: true,
        //setting id as the primary key
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //user attributes
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
    return queryInterface.dropTable('users');
  }
}
