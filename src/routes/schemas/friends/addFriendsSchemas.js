'use strict'

const Joi = require('joi')

const request = Joi.object({
  invitedUserName: Joi.string()
})

const response = Joi.object({
  invitedSent: Joi.bool().required()
})

module.exports = {
  request,
  response
}