'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const MAX_TEAM_TO_APPRECIATE_ALLOWED = coincidents.Config.profile.maxTeamToAppreciateAllowed

const request = Joi.object({
  name: Joi.string(),
  password: Joi.string().required(),
  description: Joi.string().allow(''),
  email: Joi.string(),
  userName: Joi.string().required()
})

const response = Joi.object({
  token: Joi.string().required(),
  user: Joi.object({
    name: Joi.string(),
    description: Joi.string().allow(''),
    email: Joi.string().required().allow(''),
    confirmedEmail: Joi.bool(),
    avatar: Joi.string(),
    updatedAt: Joi.date(),
    createdAt: Joi.date(),
    footballSupportedTeams: Joi.object({
      supportedTeam: Joi.object({
        teamId: Joi.string(),
        fullName: Joi.string(),
        shortName: Joi.string(),
        logo: Joi.string(),
        league: Joi.string()
      }),
      appreciatedTeams: Joi.array().items({
        teamId: Joi.string(),
        fullName: Joi.string(),
        shortName: Joi.string(),
        logo: Joi.string(),
        league: Joi.string()
      }).empty().max(MAX_TEAM_TO_APPRECIATE_ALLOWED)
    }),
    userName: Joi.string().required(),
    notifications: Joi.array(),
    numberOfFriends: Joi.number().required(),
    unreadableNotification: Joi.bool().required(),
    id: Joi.string().required()
  })
})

module.exports = {
  request,
  response
}