'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const teamSchema = require('../embeddedSchemas/teamSchema')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  leagueRef: Joi.string().length(ID_SIZE).required()
})

const response = Joi.array().items(teamSchema)

module.exports = {
  request,
  response
}