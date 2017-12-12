'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const requestManager = coincidents.Managers.requestManager
const apis = coincidents.Config.apis

const inviteReponse = (request, headers = {}) => {
  const uri = `${apis.guessUrl}/guessleague/inviteResponse`

  return requestManager.patch(uri, headers, request)
    .catch((err) => {
      throw Boom.create(err.error.statusCode, err.error.message, err)
    })
}

module.exports = {
  inviteReponse
}