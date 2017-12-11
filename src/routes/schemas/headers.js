'use strict'

const Joi = require('joi')

const headerSchema = {
  language: Joi.string().default('en-us'),
  request_id: Joi.string().required(),
  hardware_fingerprint: Joi.string().required(),
  platform: Joi.string().required(),
  os_version: Joi.string().required(),
  app_version: Joi.string().required(),
  phone_model: Joi.string().required(),
  phone_fabricator: Joi.string().required()
}
const defaultHeaderSchema = Joi.object(headerSchema).unknown()

const headerSessionSchema = Object.assign(headerSchema, {token: Joi.string().required()})
const defaultSessionHeaderSchema = Joi.object(headerSessionSchema).unknown()

module.exports = {
  defaultHeaderSchema,
  defaultSessionHeaderSchema
}

/*eslint camelcase:0 */