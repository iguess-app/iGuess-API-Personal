'use strict'

const Joi = require('joi')

const response = Joi.array().items(
  Joi.object({
    notificationRef: Joi.string().required(),
    message: Joi.string().required(),
    guessLeague: Joi.string(),
    profile: Joi.string(),
    avatar: Joi.string()
  })
)

module.exports = {
  response
}