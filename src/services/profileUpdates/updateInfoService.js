'use strict'

module.exports = (app) => {
  const updateInfoRepository = app.src.repositories.profileUpdates.updateInfoRepository;
  const ProfileUtils = app.coincidents.Utils.profileUtils;

  const updateInfo = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return updateInfoRepository.updateInfo(payload, headers)
    .catch((err) => ProfileUtils.treatErrors(err, dictionary))
  }

  return {
    updateInfo
  }
}