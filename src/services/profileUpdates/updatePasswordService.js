'use strict'

const Boom = require('boom');
const Promise = require('bluebird');

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const updatePasswordRepository = app.src.repositories.profileUpdates.updatePasswordRepository;
  const PasswordUtis = app.coincidents.Utils.passwordUtils;
  const ErrorUtils = app.coincidents.Utils.errorUtils;
  const CacheManager = app.coincidents.Managers.cacheManager;

  const updatePassword = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    const session = await sessionManager.getSession(headers, dictionary)
    payload.userName = session.userName
    
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

          return updatePasswordRepository.updatePassword(payload, headers)
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

    return CacheManager.get(cacheKey).then((cacheResponse) => {
      if (cacheResponse && cacheResponse.wrongAttempts > MAXIMUM_NUMBER_ERRORS_IN_ONE_HOUR) {
        throw new Error(ErrorUtils.userErrors.tooManyPasswordsWrong);
      }
    })
  }

  const _setErrorTriedOnCache = (cacheKey) => {
    const ONE_HOUR_IN_SECONDS = 3600;
    CacheManager.get(cacheKey).then((cacheResponse) => {

      if (!cacheResponse) {
        const newWrongAttempt = {
          wrongAttempts: 1
        }

        return CacheManager.set(cacheKey, newWrongAttempt, ONE_HOUR_IN_SECONDS)
      }
      cacheResponse.wrongAttempts += 1;

      return CacheManager.set(cacheKey, cacheResponse, ONE_HOUR_IN_SECONDS)
    })
  }

  return {
    updatePassword
  }
}