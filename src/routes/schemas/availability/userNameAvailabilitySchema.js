'use strict'

const Joi = require('joi')

const request = Joi.object({
  userName: Joi.string().required()
})

const response = Joi.object({
  available: Joi.bool().required(),
  alertMessage: Joi.string()
})

module.exports = {
  request,
  response
}