'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const loginRepository = app.src.application.repositories.loginRepository;
  const PasswordUtils = app.src.utils.passwordUtils;
  const Errors = app.src.utils.errorUtils;

  const singUp = (payload, headers) =>
    PasswordUtils.checkPasswordRestrict(payload)
    .then((userData) => PasswordUtils.cryptPassword(userData))
    .then((userWithPassCrypted) => _useNicknameLikeID(userWithPassCrypted))
    .then((userToDB) => loginRepository.singUp(userToDB))
    .catch((err) => _treatErrors(err, payload, headers.language))

  const singIn = (query, headers) => loginRepository.singIn(query, headers)
    

  const _treatErrors = (err, payload, language) => {
    const dictionary = app.src.translate.gate.selectLanguage(language);

    switch (err.code) {
      case Errors.mongoErrors._idAlreadyUsed:
        return Boom.notAcceptable(`${payload._id} ${dictionary.alreadyUsed}.`);
        break;

      case Errors.userErrors.passwordInvalid.code:
        return Boom.notAcceptable(`${dictionary.passwordAlert}.`);
        break;

      default:
        return Boom.badData(err)
    }
  }

  const _useNicknameLikeID = (user) => {
    Reflect.set(user, '_id', user.nickName)
    Reflect.deleteProperty(user, 'nickName');

    return user;
  }

  return {
    singUp,
    singIn
  }
};