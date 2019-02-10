const {Student} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const StudentEmailController = require('./StudentEmailController')

function jwtSignStudent (student) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(student, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try{
      const student = await Student.create(req.body)
      const studentJson = student.toJSON()
      res.send({
        student: studentJson,
        token: jwtSignStudent(studentJson)
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
      const student = await Student.findOne({
        where: {
          email: email
        }
      })

      if (!student) {
        return res.status(403).send({
          error: 'Wrong email/password'
        })
      }

      const isPasswordValid = await Student.comparePassword(password)

      if (!isPasswordValid) {
        return res.status(403).send({
          error: `Wrong email/password`
        })
      }

      const studentJson = student.toJSON()
      res.send({
        student: studentJson,
        token: jwtSignStudent(studentJson)
      })

    } catch (err) {
      return res.status(500).send({
          error: 'Connection Error'
      })
    }
  },

  async forgot(req, res) {
    try {
      const response = await StudentEmailController.forgot(req.body.email)
      res.send(response)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  async reset(req, res) {
    console.log("here")
    try{
      const student = await Student.findOne({
        where: {
          email: req.body.email
        }
      })
      if (student == 0)
        res.status(404).send({
          error: 'No such student'
        })
      student.update({password: req.body.password})
      res.status(200).send(req.body.password)
    } catch (err) {
      return res.status(500).send({
        error: 'Server Error (Update Failed)' +err
      })
    }
  } 
}