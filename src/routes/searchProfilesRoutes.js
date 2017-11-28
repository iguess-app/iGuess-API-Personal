'use strict'

const defaultSessionHeaderSchema = require('./schemas/headers').defaultSessionHeaderSchema
const schemas = require('./schemas/searchProfiles')

module.exports = (app) => {
  const searchProfilesController = app.src.controllers.searchProfilesController
  const server = app.configServer
  
  server.route({
    path: '/profiles/search',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        searchProfilesController.search(request, reply)
      },
      validate: {
        query: schemas.searchProfilesSchema.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schemas.searchProfilesSchema.response
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
        query: schemas.getProfileSchemas.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schemas.getProfileSchemas.response
      }
    }
  })
}