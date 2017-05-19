'use Strict';

module.exports = (app) => {
  const getProfileRepository = app.src.repositories.searchProfiles.getProfileRepository;

  const getProfile = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getProfileRepository.getProfile(request, dictionary)
  }

  return {
    getProfile
  }
};