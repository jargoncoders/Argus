module.exports = (sequelize, DataTypes) => {
  const Rock = sequelize.define('Rock', {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  })
  return Rock
}
