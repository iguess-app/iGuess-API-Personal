'use strict'

module.exports = (app) => {

  const tokenService = app.src.services.tokenService;

  const verify = (request, reply) => {
    tokenService.verify(request.query)
      .then((verifyResponse) => {
        reply(verifyResponse)
      });
  }

  return {
    verify
  }
}