'use strict'

const Joi = require('joi')

const request = Joi.empty()

const response = Joi.object({
  profileModified: Joi.bool().required()
})

module.exports = {
  request,
  response
}