'use strict'

const Joi = require('joi')

const request = Joi.object({
  page: Joi.number()
})

const response = Joi.array().items(Joi.object({
  userRef: Joi.string().required(),
  avatar: Joi.string().empty(''),
  userName: Joi.string().required()
}))

module.exports = {
  request,
  response
}