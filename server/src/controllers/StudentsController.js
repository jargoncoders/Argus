const {Student} = require('../models')

module.exports = {
  async index (req, res) {
    try{
      const students = await Student.findAll({
        limit: 10
      })
      res.send(students)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Fetch Failed)'
        })
    }
  },

  // async post (req, res) {
  //   try{
  //     const student = await Student.create(req.body)
  //     res.send(student)
  //   } catch (err) {
  //     return res.status(500).send({
  //         error: 'Server Error (Create Failed)'
  //       })
  //   }
  // },

  async show (req, res) {
    try{
      const student = await Student.findById(req.params.studentId)
      if(!student)
        res.status(404).send({
          error: 'No such data'
        })
      res.send(student)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Read Failed)'
        })
    }
  },

  async put (req, res) {
    try{
      const student = await Student.update(req.body,{
        where: {
          id: req.params.studentId
        }
      })
      if(student == 0)
        res.status(404).send({
          error: 'No such student'
        })
      res.send(req.body)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Update Failed)'
        })
    }
  },

  async delete (req, res) {
    try{
      const student = await Student.destroy({
        where: {
          id: req.params.studentId
        }
      })
      console.log(req.params.studentId)
      if (student == 0)
        res.status(404).send({
          error: 'No such data'
        })
      res.send({
        success: 'Sucessfully Deleted'
      })
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Delete Failed)'
        })
    }
  }
}