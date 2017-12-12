'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const championshipEmbeddedSchema = require('../embeddedSchemas/championshipSchema')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  inviteads: Joi.array().items(
    Joi.string().required().length(ID_SIZE)
  ).required(),
  championship: championshipEmbeddedSchema,
  guessLeagueRef: Joi.string().required().length(ID_SIZE)
})

const response = Joi.object({
  usersInviteads: Joi.bool().required(),
  alertMessage: Joi.string()
})

module.exports = {
  request,
  response
}