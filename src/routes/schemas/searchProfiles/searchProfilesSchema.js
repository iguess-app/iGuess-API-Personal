'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const request = Joi.alternatives().try(
    Joi.object({
      userName: Joi.string().required()
    }),
    Joi.object({
      userRef: Joi.string().length(ID_SIZE).required()
    })
  ).meta({
    className: 'Request'
  })

  const response = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    guessesLeagues: Joi.array().required(),
    guessesLines: Joi.array().required(),
    description: Joi.string(),
    name: Joi.string(),
    avatar: Joi.string(),
    userId: Joi.string().required(),
    updatedAt: Joi.date(),
    createdAt: Joi.date(),
    lastSignInAt: Joi.date(),
    footballSupportedTeams: Joi.object({
      appreciatedTeams: Joi.array(),
      supportedTeam: Joi.object()
    }).required(),
    numberOfFriends: Joi.number().required()
  }).meta({
    className: 'Response'
  })

  return {
    request,
    response
  }
}

/*eslint global-require: 0*/