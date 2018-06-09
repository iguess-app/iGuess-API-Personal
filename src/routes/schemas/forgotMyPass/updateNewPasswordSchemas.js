'use strict'

const Joi = require('joi')

const request = Joi.object({
  newPassword: Joi.string().required(),
  softToken: Joi.string().required()
})

const response = Joi.object({
  profileModified: Joi.bool().required()
})

module.exports = {
  request,
  response
}