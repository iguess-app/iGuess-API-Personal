'use Strict';

module.exports = (app) => {
  const friendsRepository = app.src.application.repositories.friendsRepository;

  const search = (request, headers) =>
    friendsRepository.search(request, headers)
    // .then((usersFound) => usersFound.map((userFound) => {
    //     //TODO return only the avatar and the nickname
    //   }))

  return {
    search
  }
};