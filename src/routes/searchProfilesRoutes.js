'use strict';

const Joi = require('joi')
const defaultHeaderSchema = require('./schemas/defaultHeaderSchema')

module.exports = (app) => {
  const searchProfilesController = app.src.controllers.searchProfilesController
  const server = app.configServer
  const schemas = app.src.routes.schemas
  
  server.route({
    path: '/profiles/search',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        searchProfilesController.search(request, reply)
      },
      validate: {
        query: Joi.object({
          searchField: Joi.string().required()
        }),
        headers: defaultHeaderSchema
      }
    }
  })

  server.route({
    path: '/profiles/getProfile',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        searchProfilesController.getProfile(request, reply)
      },
      validate: {
        query: schemas.searchProfiles.searchProfilesSchema.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.searchProfiles.searchProfilesSchema.response
      }
    }
  })
};