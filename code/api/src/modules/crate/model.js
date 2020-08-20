'use strict'

// Defines the Crate model
module.exports = function(sequelize, DataTypes) {
  let Crate = sequelize.define('crates', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })

  // Establishes one-to-many relationship between crates and subscriptions
  Crate.associate = function(models) {
    Crate.hasMany(models.Subscription)
  }

  return Crate
}
