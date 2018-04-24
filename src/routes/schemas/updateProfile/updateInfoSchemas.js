'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const profileRules = coincidents.Config.profile
const USERNAME_MIN_SIZE = profileRules.userNameMinSize
const USERNAME_MAX_SIZE = profileRules.userNameMaxSize
const NAME_MIN_SIZE = profileRules.nameMinSize
const NAME_MAX_SIZE = profileRules.nameMaxSize

const request = Joi.object({
  newUserName: Joi.string().min(USERNAME_MIN_SIZE).max(USERNAME_MAX_SIZE),
  name: Joi.string().min(NAME_MIN_SIZE).max(NAME_MAX_SIZE),
  description: Joi.string().allow(''),
  email: Joi.string().allow('')
})

const response = Joi.object({
  profileModified: Joi.bool().required()
})

module.exports = {
  request,
  response
}