'use strict'

const Joi = require('joi')

const request = Joi.object({
  userRef: Joi.string().required()
})

const response = Joi.array().items(
  Joi.object({
    notificationRef: Joi.string(),
    message: Joi.string().required(),
    guessLeague: Joi.string(),
    profile: Joi.string(),
    avatar: Joi.string()
  })
)

module.exports = {
  request,
  response
}