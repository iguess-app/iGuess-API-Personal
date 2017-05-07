'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const signUpRepository = app.src.repositories.login.signUpRepository;
  const PasswordUtils = app.coincidents.Utils.passwordUtils;
  const ProfileUtils = app.coincidents.Utils.profileUtils;
  const Errors = app.coincidents.Utils.errorUtils;

  const singUp = (payload, headers) => {
    _checkRestricts(payload, headers.language)

    return PasswordUtils.cryptPassword(payload.password)
      .then((cryptedPassword) => _buildNewUserObj(payload, cryptedPassword))
      .then((userToDB) => signUpRepository.singUp(userToDB))
      .catch((err) => _treatErrors(err, payload, headers.language))
  }

  const _buildNewUserObj = (payload, cryptedPassword) => {
    payload.password = cryptedPassword;
    payload.confirmedEmail = false;
    
    return payload;
  }

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
    singUp
  }
};