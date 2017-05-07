'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const loginController = app.src.controllers.loginController;
  const server = app.configServer;
  const maxTeamToSupportAllowed = app.coincidents.Config.maxTeamToSupportAllowed;

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
          description: Joi.string().allow(''),
          email: Joi.string(),
          userName: Joi.string().required(),
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
        schema: Joi.object({
            token: Joi.string().required(),
            user: Joi.object({
              name: Joi.string().required(),
              description: Joi.string().allow(''),
              email: Joi.string().required().allow(''),
              confirmedEmail: Joi.bool(),
              guessesLines: Joi.array().empty(),
              teamsSupported: Joi.array().empty().max(maxTeamToSupportAllowed),
              userName: Joi.string().required(),
              notifications: Joi.array(),
              guessesLeagues: Joi.array(),
              friendList: Joi.array()
            })
          })
          .meta({
            className: 'Response'
          })
      }
    }
  })

  server.route({
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
              confirmedEmail: Joi.bool(),
              guessesLines: Joi.array().empty(),
              teamsSupported: Joi.array().empty().max(maxTeamToSupportAllowed),
              userName: Joi.string().required(),
              notifications: Joi.array(),
              guessesLeagues: Joi.array(),
              friendList: Joi.array()
            })
          })
          .meta({
            className: 'Response'
          })
      }
    }
  })

};