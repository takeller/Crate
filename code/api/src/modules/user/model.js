// Unsure what this is
'use strict'

// The following block defines the user model.
// User
module.exports = function(sequelize, DataTypes) {
  // Using sequelize ORM to define what a user is
  let User = sequelize.define('users', {
    // Defining user attributes
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })
  // Defining one-to-many relationship with subscriptions
  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
