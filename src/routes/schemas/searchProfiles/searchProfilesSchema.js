'use strict'

const Joi = require('joi')

const request = Joi.object({
  searchField: Joi.string().required()
})

const response = Joi.array().items(
  Joi.object({
    _id: Joi.object(),
    avatar: Joi.string().empty(''),
    userName: Joi.string().required(),
    name: Joi.string()
  })
)

module.exports = {
    request,
    response
}