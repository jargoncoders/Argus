const Joi = require('joi')

module.exports = {
  post (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      contact: Joi.string(),
      desc: Joi.string()
    }
    
    const {error, value} = Joi.validate(req.body, schema)

    if(error) {
      switch(error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break;

        case 'contact':
          res.status(400).send({
            error: `You must provide a contact`
          })
          break;

        case 'desc':
          res.status(400).send({
            error: `You must provide a description`
          })
          break;

        default:
      }
    } else {
      next()
    }
  }
}