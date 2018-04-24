'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const footballSupportedTeamSchema = require('../embeddedSchemas/footballSupportedTeamSchema')
const profileRules = coincidents.Config.profile
const USERNAME_MIN_SIZE = profileRules.userNameMinSize
const USERNAME_MAX_SIZE = profileRules.userNameMaxSize
const NAME_MIN_SIZE = profileRules.nameMinSize
const NAME_MAX_SIZE = profileRules.nameMaxSize

const request = Joi.object({
  userName: Joi.string().min(USERNAME_MIN_SIZE).max(USERNAME_MAX_SIZE).required(),
  name: Joi.string().min(NAME_MIN_SIZE).max(NAME_MAX_SIZE).required(),
  password: Joi.string().required(),
  email: Joi.string().required()
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
    footballSupportedTeams: footballSupportedTeamSchema,
    userName: Joi.string().required(),
    notifications: Joi.array(),
    numberOfFriends: Joi.number().required(),
    unreadNotification: Joi.bool().required(),
    userRef: Joi.string().required()
  })
})

module.exports = {
  request,
  response
}