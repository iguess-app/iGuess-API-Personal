'use strict'

const Joi = require('joi')

const request = Joi.object({
  userName: Joi.string(),
  invitedUserName: Joi.string()
})

const response = Joi.object({
  invitedSent: Joi.bool().required()
})

module.exports = {
  request,
  response
}