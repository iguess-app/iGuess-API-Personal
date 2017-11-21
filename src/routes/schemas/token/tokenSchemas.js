'use strict'

const Joi = require('joi')

const request = Joi.object({
  token: Joi.string().required()
})

const response = Joi.object({
  valid: Joi.bool().required()
})

module.exports = {
  request,
  response
}