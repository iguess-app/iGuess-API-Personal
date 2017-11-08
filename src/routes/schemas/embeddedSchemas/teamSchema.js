'use strict'

const Joi = require('joi')

const teamSchema = Joi.object({
  teamId: Joi.string().required(),
  fullName: Joi.string().required(),
  shortName: Joi.string().required(),
  logo: Joi.string(),
  league: Joi.string().required()
})

module.exports = teamSchema