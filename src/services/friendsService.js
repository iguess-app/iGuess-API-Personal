'use Strict';

module.exports = (app) => {
  const friendsRepository = app.src.repositories.friendsRepository;
  const ProfileUtils = app.coincidents.Utils.profileUtils;

  const search = (request, headers) =>
    friendsRepository.search(request, headers)
    .then((usersFound) => usersFound.map((userFound) => ProfileUtils.useIDLikeNickname(userFound)))

  return {
    search
  }
};