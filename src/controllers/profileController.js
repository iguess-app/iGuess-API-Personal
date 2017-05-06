'use Strict';

module.exports = (app) => {

  const profileService = app.src.services.profileService;
  const profilePasswordService = app.src.services.profilePasswordService;
  const profileAvatarService = app.src.services.profileAvatarService;

  const update = (request, reply) => {
    profileService.update(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse)
      })
      .catch((err) => reply(err));
  }

  const updatePassword = (request, reply) => {
    profilePasswordService.updatePassword(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse)
      })
      .catch((err) =>
        reply(err)
      );
  }

  const updateAvatar = (request, reply) => {
    profileAvatarService.updateAvatar(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse)
      })
      .catch((err) =>
        reply(err)
      );
  }

  return {
    update,
    updatePassword,
    updateAvatar
  }
}