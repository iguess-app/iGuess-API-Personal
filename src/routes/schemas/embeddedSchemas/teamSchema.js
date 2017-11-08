'use strict'

const Joi = require('joi')

const teamSchema = Joi.object({
  teamId: Joi.string(),
  fullName: Joi.string(),
  shortName: Joi.string(),
  logo: Joi.string(),
  league: Joi.string()
})

module.exports = teamSchema