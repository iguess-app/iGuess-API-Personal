'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const loginController = app.src.application.controllers.loginController;
  const MAX_TEAM_SUPPORTED = 3;

  app.src.config.routes.push({
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
          description: Joi.string().allow(''),
          email: Joi.string(),
          nickName: Joi.string().required(),
          guessesLines: Joi.array(),
          teamsSupported: Joi.array().items(
            Joi.string(),
            Joi.string(),
            Joi.string()
          )
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({}).unknown()
          .meta({
            className: 'Response'
          })
      }
    }
  })

  app.src.config.routes.push({
    path: '/login/singin',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        loginController.singIn(request, reply)
      },
      validate: {
        query: Joi.object({
          login: Joi.string().required(),
          password: Joi.string().required()
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
            token: Joi.string().required(),
            user: Joi.object({
              name: Joi.string().required(),
              description: Joi.string().allow(''),
              email: Joi.string().required().allow(''),
              guessesLines: Joi.array().empty(),
              teamsSupported: Joi.array().empty().max(MAX_TEAM_SUPPORTED),
              nickName: Joi.string().required(),
              notifications: Joi.array(),
              guessesLeagues: Joi.array(),
              friendList: Joi.array()
            })
          }).unknown()
          .meta({
            className: 'Response'
          })
      }
    }
  })

  app.src.config.routes.push({
    method: '*',
    path: '/login/singup/facebook',
    config: {
      auth: {
        strategy: 'facebook',
        mode: 'try'
      },
      handler(request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply(`Authentication failed due to: ${request.auth.error.message}`);
        }
        reply(`<pre>${JSON.stringify(request.auth.credentials, null, 2)}</pre>`);
      }
    }
  });

};