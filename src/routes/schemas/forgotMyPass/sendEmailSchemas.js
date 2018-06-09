'use strict'

const Joi = require('joi')

const request = Joi.object({
  emailOrUsername: Joi.string().required()
})

const response = Joi.object({
  sent: Joi.bool().required(),
  emailHiddened: Joi.string().required()
})

module.exports = {
  request,
  response
}