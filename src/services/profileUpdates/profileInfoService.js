'use Strict';

module.exports = (app) => {
  const profileInfoRepository = app.src.repositories.profileUpdates.profileInfoRepository;
  const ProfileUtils = app.coincidents.Utils.profileUtils;

  const updateInfo = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return profileInfoRepository.updateInfo(payload, headers)
    .catch((err) => ProfileUtils.treatErrors(err, dictionary))
  }

  return {
    updateInfo
  }
}