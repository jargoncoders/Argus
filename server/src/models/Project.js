module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    github: DataTypes.STRING,
    presentation: DataTypes.STRING,
    video: DataTypes.STRING,
    stage: DataTypes.INTEGER,
    evaluation: DataTypes.JSON,
    remarks: DataTypes.JSON,
    isViewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  return Project
}
