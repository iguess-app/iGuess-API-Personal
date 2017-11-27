'use strict'

const Joi = require('joi')

const defaultHeaderSchema = Joi.object({
  language: Joi.string().default('en-us')
}).unknown()

const defaultSessionHeaderSchema = Joi.object({
  language: Joi.string().default('en-us'),
  token: Joi.string().required()
}).unknown()

module.exports = {
  defaultHeaderSchema,
  defaultSessionHeaderSchema
}