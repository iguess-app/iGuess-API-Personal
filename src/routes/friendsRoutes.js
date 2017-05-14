'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const friendsController = app.src.controllers.friendsController;
  const server = app.configServer;

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
    path: '/friends/responseInvite',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        friendsController.responseInvite(request, reply)
      },
      validate: {
        payload: Joi.object({
          userName: Joi.string().required(),
          invitatorUserName: Joi.string().required(),
          inviteAccept: Joi.bool().required()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
            invitedAnswered: Joi.bool().required(),
            friendListModified: Joi.bool().required()
          })
          .meta({
            className: 'Response'
          })
      }
    }
  })

};