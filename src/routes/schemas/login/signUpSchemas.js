'use strict'

const Joi = require('joi')

const footballSupportedTeamSchema = require('../embeddedSchemas/footballSupportedTeamSchema')

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