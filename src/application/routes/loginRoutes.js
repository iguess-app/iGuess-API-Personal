'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const loginController = app.src.application.controllers.loginController;
  const server = app.configServer;
  const maxTeamsSupported = 3;
  
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
          email: Joi.string(),
          password: Joi.string().required(),
          nickName: Joi.string()
        })
      },
      response: {
        schema: Joi.object({
          token: Joi.string().required(),
          user: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required().allow(''),
            email: Joi.string().required().allow(''),
            guessesLines: Joi.array().empty(),
            teamsSupported: Joi.array().empty().max(maxTeamsSupported),
            nickName: Joi.string().required()
          })
        }).unknown()
        .meta({ 
          className: 'Response' 
        })}
    }
  })

};