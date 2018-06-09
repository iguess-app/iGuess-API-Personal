'use strict'

const Joi = require('joi')

const request = Joi.object({
  softToken: Joi.string().required()
})

const response = Joi.object({
  name: Joi.string().required(),
  softToken: Joi.string().required()
})

module.exports = {
  request,
  response
}