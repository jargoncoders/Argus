const {Order} = require('../models')
const {Query} = require('../models')
const {Service} = require('../models')

module.exports = {
  async index(req, res) {
    try{
      const orders = await Order.count({
        where: {
          isViewed: false
        }
      })
      const queries = await Query.count({
        where: {
          isViewed: false
        }
      })
      const services = await Service.count({
        where: {
          isViewed: false
        } 
      })
      res.status(200).send({
        total: orders + queries + services,
        newOrders: orders,
        newQueries: queries,
        newServices: services
      })
    } catch (err) {
      return res.status(500).send({
          error: 'Server Error (Fetch Failed)'
        })
    }
  }
}