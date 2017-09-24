'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const friendsController = app.src.controllers.friendsController
  const server = app.configServer

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  server.route({
    path: '/friends/add',
    method: 'POST',
    config: {
      handler: (request, reply) => {
        friendsController.addFriend(request, reply)
      },
      validate: {
        payload: Joi.object({
          userName: Joi.string(),
          invitedUserName: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
            invitedSent: Joi.bool().required()
          }).required()
          .meta({
            className: 'Response'
          })
      }
    }
  })

  server.route({
    path: '/friends/list',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        friendsController.list(request, reply)
      },
      validate: {
        query: Joi.object({
          userName: Joi.string(),
          page: Joi.number()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.array().items(Joi.object({
            userId: Joi.string().required(),
            avatar: Joi.string().empty(''),
            userName: Joi.string().required()
          })).required()
          .meta({
            className: 'Response'
          })
      }
    }
  })

  server.route({
    path: '/friends/search',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        friendsController.search(request, reply)
      },
      validate: {
        query: Joi.object({
          userName: Joi.string(),
          searchField: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.array().items(Joi.object({
            userId: Joi.string().required(),
            avatar: Joi.string().empty(''),
            userName: Joi.string().required()
          })).required()
          .meta({
            className: 'Response'
          })
      }
    }
  })

  server.route({
    path: '/friends/undo',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        friendsController.undoFriendship(request, reply)
      },
      validate: {
        payload: Joi.object({
          userName: Joi.string(),
          friendUserName: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
            friendshipUndone: Joi.bool().required()
          }).required()
          .meta({
            className: 'Response'
          })
      }
    }
  })

  server.route({
    path: '/friends/areFriends',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        friendsController.areFriends(request, reply)
      },
      validate: {
        query: Joi.object({
          userRef: Joi.string().required().length(ID_SIZE),
          userRefFriend: Joi.string().required().length(ID_SIZE)
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
            areFriends: Joi.bool().required()
          }).required()
          .meta({
            className: 'Response'
          })
      }
    }
  })

}