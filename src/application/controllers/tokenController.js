'use Strict';

module.exports = (app) => {

  const tokenService = app.src.application.services.tokenService;

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