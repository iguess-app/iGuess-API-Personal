'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const availabilityController = app.src.controllers.availabilityController;
  const server = app.configServer;

  server.route({
    path: '/availability/userName',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        availabilityController.userNameAvailability(request, reply)
      },
      validate: {
        query: Joi.object({
          userName: Joi.string().required()
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
          available: Joi.bool().required()
        }).meta({
          className: 'Response'
        })
      }
    }
  })

  server.route({
    path: '/availability/email',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        availabilityController.emailAvailability(request, reply)
      },
      validate: {
        query: Joi.object({
          email: Joi.string().required()
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
          available: Joi.bool().required()
        }).meta({
          className: 'Response'
        })
      }
    }
  })
};