'use strict'

const Joi = require('joi')

const teamSchema = Joi.object({
  teamRef: Joi.string().required(),
  fullName: Joi.string().required(),
  shortName: Joi.string().required(),
  logo: Joi.object({
    mini: Joi.string(),
    small: Joi.string(),
    normal: Joi.string()
  }),
  league: Joi.string().required()
})

module.exports = teamSchema