'use strict'

const Joi = require('joi')

const request = Joi.object({
  userName: Joi.string().required(),
  newUserName: Joi.string(),
  name: Joi.string(),
  description: Joi.string().allow(''),
  email: Joi.string().allow('')
})

const response = Joi.object({
  profileModified: Joi.bool().required()
})

module.exports = {
  request,
  response
}