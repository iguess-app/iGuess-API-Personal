'use strict';

const schemas = require('./schemas/friends')
const defaultHeaderSchema = require('./schemas/headers').defaultHeaderSchema

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
        headers: defaultHeaderSchema
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
        headers: defaultHeaderSchema
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
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.searchFriendsSchemas.response
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
        payload: schemas.undoFriendshipSchemas.request,
        headers: defaultHeaderSchema
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
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.areFriendsSchemas.response
      }
    }
  })

}