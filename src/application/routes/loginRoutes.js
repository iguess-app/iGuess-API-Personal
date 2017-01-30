'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const loginController = app.src.application.controllers.loginController;
  const server = app.configServer;

  server.route({
    path: '/login/singup',
    method: 'POST',
    config: {
      handler: (request, reply) => {

        loginController.singUp(request, reply)
      },
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          password: Joi.string().required(),
          description: Joi.string(),
          email: Joi.string(),
          nickName: Joi.string().required(),
          guessesLines: Joi.array(),
          teamsSupported: Joi.array().items(
              Joi.string(),
              Joi.string(),
              Joi.string()
          )
        })
      },
      response: {
        schema: Joi.object({}).unknown()
          .meta({ className: 'Response' })
      }
    }
  })

};