'use strict'

const Joi = require('joi')

const request = Joi.object({
  avatarFile: Joi.string().required()
})

const response = Joi.object({
  profileModified: Joi.bool().required()
}).unknown()

module.exports = {
  request,
  response
}