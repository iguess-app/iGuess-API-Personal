'use Strict';

module.exports = (app) => {

  const loginService = app.src.services.loginService;
  const StatusUtils = app.coincidents.Utils.statusUtils;

  const update = (request, reply) => {
    loginService.update(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse).code(StatusUtils.ok)
      })
      .catch((err) => reply(err));    
  }

  return {
    update
  }
}