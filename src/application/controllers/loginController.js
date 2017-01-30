'use Strict';

module.exports = (app) => {

  const loginService = app.src.application.services.loginService;
  
  const singUp = (request, reply) => {
    loginService.singUp(request.payload, request.headers)
      .then((teams) => {
        reply(teams)
      });
  }

  return { singUp }
}