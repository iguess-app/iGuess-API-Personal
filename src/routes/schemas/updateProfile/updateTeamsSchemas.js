'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const maxTeamToAppreciateAllowed = coincidents.Config.profile.maxTeamToAppreciateAllowed

const supportedTeamRequest = Joi.object({
  supportedTeamId: Joi.string().required(),
  userName: Joi.string()
})

const appreciatedTeamsRequest = Joi.object({
  appreciatedTeamsId: Joi.array().required().max(maxTeamToAppreciateAllowed),
  userName: Joi.string()
})

const response = Joi.object({
  profileModified: Joi.bool().required()
})

module.exports = {
  supportedTeamRequest,
  appreciatedTeamsRequest,
  response
}