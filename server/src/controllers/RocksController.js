const {Rock} = require('../models')

module.exports = {
  async index (req, res) {
    try{
      const rocks = await Rock.findAll({
        limit: 10
      })
      res.send(rocks)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Fetch Failed)'
        })
    }
  },

  async post (req, res) {
    try{
      const rock = await Rock.create(req.body)
      res.send(rock)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Create Failed)'
        })
    }
  },

  async show (req, res) {
    try{
      const rock = await Rock.findById(req.params.rockId)
      if(!rock)
        res.status(404).send({
          error: 'No such data'
        })
      res.send(rock)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Read Failed)'
        })
    }
  },

  async put (req, res) {
    try{
      const rock = await Rock.update(req.body,{
        where: {
          id: req.params.rockId
        }
      })
      if(rock==0)
        res.status(404).send({
          error: 'No such data'
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
      const rock = await Rock.destroy({
        where: {
          id: req.params.rockId
        }
      })
      console.log(req.params.rockId)
      if(rock==0)
        res.status(404).send({
          error: 'No such data'
        })
      res.send({
        success: 'Sucessfully Deleted'
      })
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Update Failed)'
        })
    }
  }
}