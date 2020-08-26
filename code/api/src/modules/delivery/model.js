'use strict'

//Delivery
module.exports = function(sequelize, DataTypes) {
  let Delivery = sequelize.define('deliveries', {
    subscriptionId: {
      type: DataTypes.INTEGER
    },
    deliveryDate: {
      type: DataTypes.STRING
    }
  })

  Delivery.associate = function(models) {
    Delivery.belongsTo(models.Subscription)
  }

  return Delivery
}
