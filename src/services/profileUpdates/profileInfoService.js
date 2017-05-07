'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const profileInfoRepository = app.src.repositories.profileUpdates.profileInfoRepository;
  const Errors = app.coincidents.Utils.errorUtils;

  const updateInfo = (payload, headers) =>
    profileInfoRepository.updateInfo(payload, headers)
    .catch((err) => _treatErrors(err, headers.language))


  const _treatErrors = (err, language) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(language);

    switch (err.code) {
      case Errors.mongoErrors._idAlreadyUsed:
        if (err.message.includes('userName')) {
          throw Boom.notAcceptable(`${dictionary.userNameAlreadyUsed}.`);
        }
        if (err.message.includes('email')) {
          throw Boom.notAcceptable(`${dictionary.emailAlreadyUsed}.`);
        }
        throw Boom.badData(err.message)
      default:
        throw Boom.badData(err.message)
    }
  }

  return {
    updateInfo
  }
}