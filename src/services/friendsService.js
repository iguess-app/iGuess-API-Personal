'use Strict';

module.exports = (app) => {
  const friendsRepository = app.src.repositories.friendsRepository;

  const search = (request, headers) => friendsRepository.search(request, headers)

  return {
    search
  }
};