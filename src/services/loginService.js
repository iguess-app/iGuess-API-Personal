'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const singInRepository = app.src.repositories.singInRepository;
  const singUpRepository = app.src.repositories.singUpRepository;
  const profileRepository = app.src.repositories.profileRepository;
  const PasswordUtils = app.coincidents.Utils.passwordUtils;
  const ProfileUtils = app.coincidents.Utils.profileUtils;
  const Errors = app.coincidents.Utils.errorUtils;

  const singUp = (payload, headers) =>
    PasswordUtils.checkPasswordRestrict(payload)
    .then((userData) => PasswordUtils.cryptPassword(userData))
    .then((userWithPassCrypted) => ProfileUtils.useNicknameLikeID(userWithPassCrypted))
    .then((userToDB) => singUpRepository.singUp(userToDB))
    .catch((err) => _treatErrors(err, payload, headers.language))

  const singIn = (query, headers) => singInRepository.singIn(query, headers)

  const update = (payload, headers) => profileRepository.update(payload, headers)

  const _treatErrors = (err, payload, language) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(language);

    switch (err.code) {
      case Errors.mongoErrors._idAlreadyUsed:
        return Boom.notAcceptable(`${dictionary.alreadyUsed}.`);

      case Errors.userErrors.passwordInvalid.code:
        return Boom.notAcceptable(`${dictionary.passwordAlert}.`);

      default:
        return Boom.badData(err)
    }
  }

  return {
    singUp,
    singIn,
    update
  }
};