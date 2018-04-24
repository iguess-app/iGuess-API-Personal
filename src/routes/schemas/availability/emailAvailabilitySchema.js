'use strict'

const Joi = require('joi')

const request = Joi.object({
  email: Joi.string().required()
})

const response = Joi.object({
  available: Joi.bool().required(),
  alertMessage: Joi.string()
})

module.exports = {
  request,
  response
}