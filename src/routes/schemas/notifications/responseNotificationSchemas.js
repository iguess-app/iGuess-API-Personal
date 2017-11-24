'use strict'

const Joi = require('joi')

const request = Joi.object({
  userRef: Joi.string().required(),
  notificationId: Joi.string().required(),
  accepted: Joi.bool().required()
})

const response = Joi.object({
  notificationRemoved: Joi.bool().required(),
  notificationDataSetted: Joi.bool().required()
})

module.exports = {
  request,
  response
}