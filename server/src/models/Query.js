module.exports = (sequelize, DataTypes) => {
  const Query = sequelize.define('Query', {
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    desc: DataTypes.STRING,
    isViewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  return Query
}
