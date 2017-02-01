'use Strict';

module.exports = (app) => {

  const loginService = app.src.application.services.loginService;
  const StatusUtils = app.src.utils.statusUtils;
  
  const singUp = (request, reply) => {
    loginService.singUp(request.payload, request.headers)
      .then((teams) => {
        reply(teams).code(StatusUtils.created)
      });
  }

  return { singUp }
}