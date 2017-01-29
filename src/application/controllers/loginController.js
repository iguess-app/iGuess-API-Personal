'use Strict';

module.exports = (app) => {

  const loginService = app.src.application.services.loginService;
  
  const singUp = (request, reply) => {
    loginService.singUp(request.query)
      .then((teams) => {
        reply(teams)
      });
  }

  return { singUp }
}