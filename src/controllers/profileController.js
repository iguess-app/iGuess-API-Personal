'use Strict';

module.exports = (app) => {

  const profileService = app.src.services.profileService;
  const StatusUtils = app.coincidents.Utils.statusUtils;

  const update = (request, reply) => {
    profileService.update(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse).code(StatusUtils.ok)
      })
      .catch((err) => reply(err));
  }

  const updatePassword = (request, reply) => {
    profileService.updatePassword(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse).code(StatusUtils.ok)
      })
      .catch((err) =>
        reply(err)
      );
  }

  return {
    update,
    updatePassword
  }
}