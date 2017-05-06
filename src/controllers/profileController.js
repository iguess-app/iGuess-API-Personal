'use Strict';

module.exports = (app) => {
  const profilesServices = app.src.services.profileUpdates;
  const profileInfoService = profilesServices.profileInfoService;
  const profilePasswordService = profilesServices.profilePasswordService;
  const profileAvatarService = profilesServices.profileAvatarService;

  const updateInfo = (request, reply) => {
    profileInfoService.updateInfo(request.payload, request.headers)
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
    updateInfo,
    updatePassword,
    updateAvatar
  }
}