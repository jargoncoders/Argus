module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    pincode: DataTypes.STRING,
    isViewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  return Order
}
