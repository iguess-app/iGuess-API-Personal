'use strict'

const Joi = require('joi')

const request = Joi.object({
  userName: Joi.string(),
  friendUserName: Joi.string()
})

const response = Joi.object({
  friendshipUndone: Joi.bool().required()
})

module.exports = {
  request,
  response
}