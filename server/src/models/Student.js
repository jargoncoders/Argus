const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (student, options) {
  const SALT_FACTOR = 8

  if(!student.changed('password')) {
    return;
  }

  return bcrypt
      .genSaltAsync(SALT_FACTOR)
      .then(salt => bcrypt.hashAsync(student.password, salt, null))
      .then(hash => {
        student.setDataValue('password', hash)
      })
}

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    contact: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    semester: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    section: {
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

  Student.prototype.comparePassword = function (inpassword) {
    console.log(inpassword)
    return bcrypt.compareAsync(inpassword, this.password)
  }

  return Student
}
