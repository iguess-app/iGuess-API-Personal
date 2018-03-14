'use strict'

const schemas = require('./schemas/friends')
const defaultHeaderSchema = require('./schemas/headers').defaultHeaderSchema
const defaultSessionHeaderSchema = require('./schemas/headers').defaultSessionHeaderSchema

module.exports = (app) => {
  const friendsController = app.src.controllers.friendsController
  const server = app.configServer

  server.route({
    path: '/friends/add',
    method: 'POST',
    config: {
      handler: (request, reply) => {
        friendsController.addFriend(request, reply)
      },
      validate: {
        payload: schemas.addFriendsSchemas.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schemas.addFriendsSchemas.response
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
        query: schemas.listFriendsSchemas.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schemas.listFriendsSchemas.response
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
        query: schemas.searchFriendsSchemas.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schemas.searchFriendsSchemas.response
      }
    }
  })

  server.route({
    path: '/friends/undo',
    method: 'DELETE',
    config: {
      handler: (request, reply) => {
        friendsController.undoFriendship(request, reply)
      },
      validate: {
        payload: schemas.undoFriendshipSchemas.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schemas.undoFriendshipSchemas.response
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
        query: schemas.areFriendsSchemas.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schemas.areFriendsSchemas.response
      }
    }
  })

}