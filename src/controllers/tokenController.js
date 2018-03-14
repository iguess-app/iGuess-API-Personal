'use strict'

module.exports = (app) => {

  const tokenService = app.src.services.tokenService

  const verify = (request, reply) => {
    tokenService.verify(request.headers)
      .then((verifyResponse) => {
        reply(verifyResponse)
      })
      .catch((err) => reply(err))
  }

  return {
    verify
  }
}