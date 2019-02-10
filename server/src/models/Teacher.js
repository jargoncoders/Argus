const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (teacher, options) {
  const SALT_FACTOR = 8

  if(!teacher.changed('password')) {
    return;
  }

  return bcrypt
      .genSaltAsync(SALT_FACTOR)
      .then(salt => bcrypt.hashAsync(teacher.password, salt, null))
      .then(hash => {
        user.setDataValue('password', hash)
      })
}

module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    contact: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    pincode: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
      //beforeSave: hashPassword
    }
  })

  Teacher.prototype.comparePassword = function (inpassword) {
    console.log(inpassword)
    return bcrypt.compareAsync(inpassword, this.password)
  }

  return Teacher
}
