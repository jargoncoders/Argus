var fs        = require('fs'),
    path      = require('path'), 
    Sequelize = require('sequelize'),
    config    = require('../config/config'),
    db        = {};


sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

//Associations
// db.Project.hasMany(db.Student)
// db.Teacher.belongsToMany(db.Project, {through: 'ProjectTeacher'});
// db.Order.belongsToMany(db.Fish, {through: 'FishOrder'})

module.exports = db