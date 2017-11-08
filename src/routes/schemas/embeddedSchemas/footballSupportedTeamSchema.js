'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const teamSchema = require('./teamSchema')

const MAX_TEAM_TO_APPRECIATE_ALLOWED = coincidents.Config.profile.maxTeamToAppreciateAllowed

const footballSupportedTeamSchema = Joi.object({
  supportedTeam: teamSchema,
  appreciatedTeams: Joi.array().items(teamSchema).empty().max(MAX_TEAM_TO_APPRECIATE_ALLOWED)
})

module.exports = footballSupportedTeamSchema