'use strict'

// deliveryProduct
module.exports = function(sequelize, DataTypes) {
  let deliveryProduct = sequelize.define('deliveryProduct', {
    userId: {
      type: DataTypes.INTEGER
    },
    crateId: {
      type: DataTypes.INTEGER
    },
    returned: {
      type: DataTypes.BOOLEAN
    }
  })

  deliveryProduct.associate = function(models) {
    deliveryProduct.belongsTo(models.Delivery)
    deliveryProduct.belongsTo(models.Product)
  }

  return deliveryProduct
}
