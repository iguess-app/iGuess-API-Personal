'use Strict';

module.exports = (app) => {
  const responseInviteRepository = app.src.repositories.friends.responseInviteRepository;

  const responseInvite = (request, headers) => responseInviteRepository.responseInvite(request, headers)

  return {
    responseInvite
  }
};