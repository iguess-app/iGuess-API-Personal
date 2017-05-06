'use Strict';

const Boom = require('boom');
const Promise = require('bluebird');

module.exports = (app) => {
  const profilePasswordRepository = app.src.repositories.profileUpdates.profilePasswordRepository;
  const PasswordUtis = app.coincidents.Utils.passwordUtils;
  const ErrorUtils = app.coincidents.Utils.errorUtils;
  const CacheManager = app.coincidents.Managers.cacheManager;

  const updatePassword = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    const cacheKey = `${payload.userName}'s WrongAttemptsNumbers`

    if (!PasswordUtis.checkPasswordRestrict(payload.newPassword)) {
      return Boom.notAcceptable(dictionary.passwordAlert)
    }
    const cryptNewPasswordPromise = PasswordUtis.cryptPassword(payload.newPassword)
    const cryptOldPasswordPromise = PasswordUtis.cryptPassword(payload.oldPassword)

    return _checkWrongAttemptsNumbers(cacheKey)
      .then(() => Promise.all([cryptNewPasswordPromise, cryptOldPasswordPromise])
        .spread((newCryptedPassword, oldCryptedPassword) => {
          payload.newPassword = newCryptedPassword;
          payload.oldPassword = oldCryptedPassword;

          return profilePasswordRepository.updatePassword(payload, headers)
        }))
      .catch((err) => {
        switch (parseInt(err.message, 10)) {
          case ErrorUtils.userErrors.passwordInvalid:
            _setErrorTriedOnCache(cacheKey)
            throw Boom.unauthorized(dictionary.invalidPassword)
          case ErrorUtils.userErrors.tooManyPasswordsWrong:
            throw Boom.tooManyRequests(dictionary.tooManyInvalidPassword)
          default:
            return Boom.badData(err)
        }
      })

  }

  const _checkWrongAttemptsNumbers = (cacheKey) => {
    const MAXIMUM_NUMBER_ERRORS_IN_ONE_HOUR = 10;

    return CacheManager.get(cacheKey).then((wrongAttempts) => {
      const wrongAttemptsInt = parseInt(wrongAttempts, 10);
      if (wrongAttemptsInt > MAXIMUM_NUMBER_ERRORS_IN_ONE_HOUR) {
        throw new Error(ErrorUtils.userErrors.tooManyPasswordsWrong);
      }
    })
  }

  const _setErrorTriedOnCache = (cacheKey) => {
    const ONE_HOUR_IN_SECONDS = 3600;
    CacheManager.get(cacheKey).then((cacheResponse) => {
      const newWrongAttempt = 1
      let wrongAttempts = parseInt(cacheResponse, 10);
      if (!wrongAttempts) {
        CacheManager.set(cacheKey, newWrongAttempt, ONE_HOUR_IN_SECONDS)
      }
      wrongAttempts += newWrongAttempt;
      CacheManager.set(cacheKey, wrongAttempts, ONE_HOUR_IN_SECONDS)
    })
  }

  return {
    updatePassword
  }
}