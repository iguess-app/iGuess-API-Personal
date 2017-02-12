'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const tokenController = app.src.application.controllers.tokenController;

  app.src.config.routes.push({
    path: '/token/verify',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        tokenController.verify(request, reply)
      },
      validate: {
        query: Joi.object({
          token: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
          valid: Joi.bool()
        }).meta({
          className: 'Response'
        })
      }
    }
  })
}