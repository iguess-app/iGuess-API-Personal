'use strict'

const Joi = require('joi')

const defaultHeaderSchema = Joi.object({
  language: Joi.string().default('en-us')
}).unknown()

module.exports = defaultHeaderSchema