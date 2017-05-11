'use Strict';

module.exports = (app) => {
  const searchProfilesRepository = app.src.repositories.searchProfilesRepository;

  const search = (request, headers) => searchProfilesRepository.search(request, headers)

  return {
    search
  }
};