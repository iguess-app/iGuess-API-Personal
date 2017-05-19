'use Strict';

module.exports = (app) => {
  const searchProfilesRepository = app.src.repositories.searchProfiles.searchProfilesRepository;

  const search = (request, headers) => searchProfilesRepository.search(request, headers)

  return {
    search
  }
};