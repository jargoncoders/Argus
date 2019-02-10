const {Order} = require('../models')
const {Rock} = require('../models')
const {Plant} = require('../models')
const {Fish} = require('../models')
const EmailController = require('./EmailController')

module.exports = {
  async index (req, res) {
    try{
      const orders = await Order.findAll({
        limit: 10
      })
      res.status(200).send(orders)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Fetch Failed)'
        })
    }
  },

  async post (req, res) {
    try{
      const order = await Order.create(req.body.order)
      const rocks = await Rock.findAll({
        where: {
          id: req.body.rockIds
        }
      })
      const plants = await Plant.findAll({
        where: {
          id: req.body.plantIds
        }
      })
      const fishes = await Fish.findAll({
        where: {
          id: req.body.fishIds
        }
      })
      order.addRocks(rocks)
      order.addPlants(plants)
      order.addFishes(fishes)
      EmailController.sendOrderToUser(order)
      EmailController.sendOrderToAdmin(order)
      res.status(200).send(order)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Create Failed)'
        })
    }
  },

  async show (req, res) {
    try{
      const order = await Order.findById(req.params.orderId)
      if(!order)
        res.status(404).send({
          error: 'No such data'
        })
      console.log(order.dataValues)
      const rocks = await order.getRocks({attributes: ['id', 'name', 'imageUrl'], joinTableAttributes: []})
      const plants = await order.getPlants({attributes: ['id', 'name', 'imageUrl'], joinTableAttributes: []})
      const fishes = await order.getFishes({attributes: ['id', 'name', 'imageUrl'], joinTableAttributes: []})
      res.status(200).send({
        order: order,
        rocks: rocks,
        plants: plants,
        fishes: fishes
      })
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Read Failed)'
        })
    }
  },

  async put (req, res) {
    try{
      const order = await Order.update(req.body,{
        where: {
          id: req.params.orderId
        }
      })
      if(order==0)
        res.status(404).send({
          error: 'No such data'
        })
      res.send(req.body)
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Update Failed)'
        })
    }
  }

  // async delete (req, res) {
  //   try{
  //     const order = await Order.destroy({
  //       where: {
  //         id: req.params.orderId
  //       }
  //     })
  //     if(order==0)
  //       res.status(404).send({
  //         error: 'No such data'
  //       })
  //     res.send({
  //       success: 'Sucessfully Deleted'
  //     })
  //   } catch (err) {
  //     return res.status(500).send({
  //         error: 'Server Error (Update Failed)'
  //       })
  //   }
  // }
}