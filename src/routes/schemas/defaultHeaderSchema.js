'use strict'

const Joi = require('joi')

module.exports = () => {

  const defaultHeaderSchema = Joi.object({
    language: Joi.string().default('en-us')
  }).unknown()

  return defaultHeaderSchema
}