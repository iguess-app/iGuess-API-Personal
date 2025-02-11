'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.empty()

const response = Joi.array().items(
  Joi.object({
    leagueRef: Joi.string().length(ID_SIZE).required(),
    country: Joi.string().required(),
    countryInitials: Joi.string().required(),
    name: Joi.string().required(),
    serie: Joi.number().required(),
    association: Joi.string().required(),
    flag: Joi.object({
      mini: Joi.string().allow('').required(),
      small: Joi.string().allow('').required(),
      normal: Joi.string().allow('').required()
    }),
    haveActiveLines: Joi.bool().required()
  })
)

module.exports = {
    request,
    response
}