const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')
      )
    }
    
    const {error, value} = Joi.validate(req.body, schema)

    if(error) {
      switch(error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break;

        case 'password':
          res.status(400).send({
            error: `The password must have:
            <br>
            1. A lowercase alphabet
            2. An uppercase alphabet
            2. A numeric character
            3. A special character
            4. atleast 6 characters
            `
          })
          break;

        default:
      }
    } else {
      next()
    }
  }
}