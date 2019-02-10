const {Teacher} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const TeacherEmailController = require('./TeacherEmailController')

function jwtSignTeacher (teacher) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(teacher, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try{
      const teacher = await Teacher.create(req.body)
      const teacherJson = teacher.toJSON()
      res.send({
        teacher: teacherJson,
        token: jwtSignTeacher(teacherJson)
      })
    } catch (err) {
      res.status(400).send({
        error: `This email is already registered
        ${err}`
      })
    }
  },
  async login(req, res) {
    try{
      const {email, password} = req.body
      const teacher = await Teacher.findOne({
        where: {
          email: email
        }
      })

      if (!teacher) {
        return res.status(403).send({
          error: 'Wrong email/password'
        })
      }

      const isPasswordValid = await Teacher.comparePassword(password)

      if (!isPasswordValid) {
        return res.status(403).send({
          error: `Wrong email/password`
        })
      }

      const teacherJson = Teacher.toJSON()
      res.send({
        teacher: teacherJson,
        token: jwtSignteacher(teacherJson)
      })

    } catch (err) {
      return res.status(500).send({
          error: 'Connection Error'
      })
    }
  },

  async forgot(req, res) {
    try {
      const response = await TeacherEmailController.forgot(req.body.email)
      res.send(response)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  async reset(req, res) {
    console.log("here")
    try{
      const teacher = await Teacher.findOne({
        where: {
          email: req.body.email
        }
      })
      if (teacher == 0)
        res.status(404).send({
          error: 'No such teacher'
        })
      teacher.update({password: req.body.password})
      res.status(200).send(req.body.password)
    } catch (err) {
      return res.status(500).send({
        error: 'Server Error (Update Failed)' +err
      })
    }
  } 
}