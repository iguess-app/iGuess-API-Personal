'use strict'

const Joi = require('joi')

const request = Joi.object({
  searchField: Joi.string()
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