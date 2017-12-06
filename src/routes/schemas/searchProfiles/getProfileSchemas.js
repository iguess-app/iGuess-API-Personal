'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const schemaRequestWithUserRef = Joi.object({
  userRef: Joi.string().length(ID_SIZE).required()
})

const schemaRequestWithUserName = Joi.object({
  userName: Joi.string().required()
})

const schemaRequestSelfSearch = Joi.object({
  self: Joi.bool().only([true]).required()
})

const request = Joi.alternatives().try(schemaRequestWithUserRef, schemaRequestWithUserName, schemaRequestSelfSearch)

const response = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required(),
  description: Joi.string(),
  name: Joi.string(),
  avatar: Joi.string(),
  userRef: Joi.string().required(),
  updatedAt: Joi.date(),
  createdAt: Joi.date(),
  lastSignInAt: Joi.date(),
  footballSupportedTeams: Joi.object({
    appreciatedTeams: Joi.array(),
    supportedTeam: Joi.object()
  }).required(),
  numberOfFriends: Joi.number().required()
})

module.exports = {
    request,
    response
}