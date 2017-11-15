'use strict'

const Joi = require('joi')

const request = Joi.object({
  avatarFile: Joi.string().required(),
  userName: Joi.string()
})

const response = Joi.object({
  profileModified: Joi.bool().required()
}).unknown()

module.exports = {
  request,
  response
}