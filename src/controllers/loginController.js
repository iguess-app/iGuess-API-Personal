'use Strict';

module.exports = (app) => {

  const loginService = app.src.services.loginService;
  const StatusUtils = app.coincidents.Utils.statusUtils;

  const singUp = (request, reply) => {
    loginService.singUp(request.payload, request.headers)
      .then((singUpResponse) => {
        reply(singUpResponse).code(StatusUtils.created)
      })
      .catch((err) => reply(err));
  }

  const singIn = (request, reply) => {
    loginService.singIn(request.query, request.headers)
      .then((singInResponse) => {
        reply(singInResponse).code(StatusUtils.ok)
      })
      .catch((err) => reply(err));
  }

  return {
    singUp,
    singIn
  }
}