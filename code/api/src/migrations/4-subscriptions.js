module.exports = {
  up: (queryInterface, Sequelize) => {
    //create subscription table 
    //subscription table is a "joins table" (helps connect other tables together)
    return queryInterface.createTable('subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        //primary key
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //userId is required - no subscription will be made if no userId exists
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      //crateId is necessary to be in the subscription table
      crateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crates',
          key: 'id'
        },
        allowNull: false
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
    return queryInterface.dropTable('subscriptions');
  }
}
