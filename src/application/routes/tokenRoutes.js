'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const tokenController = app.src.application.controllers.tokenController;
  const server = app.configServer;

  server.route({
    path: '/token/verify',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        tokenController.verify(request, reply)
      },
      validate: {
        query: Joi.object({
          token: Joi.string()
        })
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