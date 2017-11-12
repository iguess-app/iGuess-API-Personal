'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  userRef: Joi.string().required().length(ID_SIZE),
  userRefFriend: Joi.string().required().length(ID_SIZE)
})

const response = Joi.object({
  areFriends: Joi.bool().required()
})

module.exports = {
  request,
  response
}