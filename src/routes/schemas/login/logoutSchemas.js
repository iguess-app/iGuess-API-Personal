'use strict'

const Joi = require('joi')

const response = Joi.object({
  logout: Joi.bool().required()
})

module.exports = {
  response
}