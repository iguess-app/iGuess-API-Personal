'use Strict';

module.exports = (app) => {
  const friendsRepository = app.src.application.repositories.friendsRepository;
  const ProfileUtils = app.src.utils.profileUtils;

  const search = (request, headers) =>
    friendsRepository.search(request, headers)
    .then((usersFound) => usersFound.map((userFound) => ProfileUtils.useIDLikeNickname(userFound)))

  return {
    search
  }
};