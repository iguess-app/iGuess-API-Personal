'use strict'

const Joi = require('joi')

const request = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  userName: Joi.string()
})

const response = Joi.object({
  profileModified: Joi.bool().required()
})

module.exports = {
  request,
  response
}