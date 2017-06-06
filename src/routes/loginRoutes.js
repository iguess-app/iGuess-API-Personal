'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const loginController = app.src.controllers.loginController;
  const server = app.configServer;
  const maxTeamToAppreciateAllowed = app.coincidents.Config.profile.maxTeamToAppreciateAllowed;

  server.route({
    path: '/login/singup',
    method: 'POST',
    config: {
      handler: (request, reply) => {
        loginController.singUp(request, reply)
      },
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          password: Joi.string().required(),
          description: Joi.string().allow(''),
          email: Joi.string(),
          userName: Joi.string().required()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
            token: Joi.string().required(),
            user: Joi.object({
              name: Joi.string(),
              description: Joi.string().allow(''),
              email: Joi.string().required().allow(''),
              confirmedEmail: Joi.bool(),
              avatar: Joi.string(),
              guessesLines: Joi.array().empty(),
              updatedAt: Joi.date(),
              createdAt: Joi.date(),
              footballSupportedTeams: Joi.object({
                supportedTeam: Joi.object({
                  teamId: Joi.string(),
                  fullName: Joi.string(),
                  shortName: Joi.string(),
                  logo: Joi.string(),
                  league: Joi.string()
                }),
                appreciatedTeams: Joi.array().items({
                  teamId: Joi.string(),
                  fullName: Joi.string(),
                  shortName: Joi.string(),
                  logo: Joi.string(),
                  league: Joi.string()
                }).empty().max(maxTeamToAppreciateAllowed)
              }),
              userName: Joi.string().required(),
              notifications: Joi.array(),
              guessesLeagues: Joi.array(),
              numberOfFriends: Joi.number().required(),
              unreadableNotification: Joi.bool().required(),
              id: Joi.string().required()
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
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
            token: Joi.string().required(),
            user: Joi.object({
              name: Joi.string(),
              description: Joi.string().allow(''),
              email: Joi.string().required().allow(''),
              confirmedEmail: Joi.bool(),
              avatar: Joi.string(),
              updatedAt: Joi.date(),
              createdAt: Joi.date(),
              lastSignInAt: Joi.date(),
              guessesLines: Joi.array().empty(),
              footballSupportedTeams: Joi.object({
                supportedTeam: Joi.object({
                  teamId: Joi.string(),
                  fullName: Joi.string(),
                  shortName: Joi.string(),
                  logo: Joi.string(),
                  league: Joi.string()
                }),
                appreciatedTeams: Joi.array().items({
                  teamId: Joi.string(),
                  fullName: Joi.string(),
                  shortName: Joi.string(),
                  logo: Joi.string(),
                  league: Joi.string()
                }).empty().max(maxTeamToAppreciateAllowed)
              }),
              userName: Joi.string().required(),
              notifications: Joi.array(),
              guessesLeagues: Joi.array(),
              numberOfFriends: Joi.number().required(),
              unreadableNotification: Joi.bool().required(),
              id: Joi.string().required()
            })
          })
          .meta({
            className: 'Response'
          })
      }
    }
  })

};