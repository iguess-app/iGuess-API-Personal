'use Strict';

module.exports = (app) => {
  const friendsRepository = app.src.application.repositories.friendsRepository;

  const search = (request, headers) =>
    friendsRepository.search(request, headers)
    .then((usersFound) => usersFound.map((userFound) => _structureUserObj(userFound)))

  const _structureUserObj = (userFound) => {
    Reflect.set(userFound, 'nickName', userFound._id)
    Reflect.deleteProperty(userFound, '_id');

    return userFound;
  }

  return {
    search
  }
};