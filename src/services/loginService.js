'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const singInRepository = app.src.repositories.singInRepository;
  const singUpRepository = app.src.repositories.singUpRepository;
  const PasswordUtils = app.coincidents.Utils.passwordUtils;
  const ProfileUtils = app.coincidents.Utils.profileUtils;
  const Errors = app.coincidents.Utils.errorUtils;

  const singUp = (payload, headers) => {
    _checkRestricts(payload, headers.language)

    return PasswordUtils.cryptPassword(payload)
      .then((userToDB) => singUpRepository.singUp(userToDB))
      .catch((err) => _treatErrors(err, payload, headers.language))
  }

  const singIn = (query, headers) => singInRepository.singIn(query, headers)

  const _treatErrors = (err, payload, language) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(language);

    switch (err.code) {
      case Errors.mongoErrors._idAlreadyUsed:
        return Boom.notAcceptable(`${dictionary.alreadyUsed}.`);
      default:
        return Boom.badData(err)
    }
  }

  const _checkRestricts = (payload, language) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(language);

    if (PasswordUtils.checkPasswordRestrict(payload.password) !== true) {
      throw Boom.notAcceptable(`${dictionary.passwordAlert}.`);
    }
    if (ProfileUtils.isEmail(payload.email) !== true) {
      throw Boom.notAcceptable(`${dictionary.notAEmail}.`);
    }

    return payload;
  }

  return {
    singUp,
    singIn
  }
};