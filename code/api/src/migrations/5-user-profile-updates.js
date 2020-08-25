'use strict';
// we used promise here and strict. they weren't
// used in the previous migrations and i imagine
// they aren't necessary here but it worked for us
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'description',
        {
          type: Sequelize.TEXT
        }
      ),
      queryInterface.addColumn(
        'users',
        'address',
        {
          type: Sequelize.TEXT
        }
      ),
      queryInterface.addColumn(
        'users',
        'image',
        {
          type: Sequelize.TEXT
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'description'),
      queryInterface.removeColumn('users', 'address'),
      queryInterface.removeColumn('users', 'image')
    ]);
  }
};
