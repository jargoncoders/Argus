const {Teacher} = require('../models')

module.exports = {
  async index (req, res) {
    try{
      const teachers = await Teacher.findAll({
        limit: 10
      })
      res.send(teachers)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Fetch Failed)'
        })
    }
  },

  // async post (req, res) {
  //   try{
  //     const teacher = await teacher.create(req.body)
  //     res.send(teacher)
  //   } catch (err) {
  //     return res.status(500).send({
  //         error: 'Server Error (Create Failed)'
  //       })
  //   }
  // },

  async show (req, res) {
    try{
      const teacher = await Teacher.findById(req.params.teacherId)
      if(!teacher)
        res.status(404).send({
          error: 'No such data'
        })
      res.send(teacher)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Read Failed)'
        })
    }
  },

  async put (req, res) {
    try{
      const teacher = await Teacher.update(req.body,{
        where: {
          id: req.params.teacherId
        }
      })
      if(teacher == 0)
        res.status(404).send({
          error: 'No such teacher'
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
      const teacher = await Teacher.destroy({
        where: {
          id: req.params.teacherId
        }
      })
      console.log(req.params.teacherId)
      if (teacher == 0)
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