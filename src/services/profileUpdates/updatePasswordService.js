'use strict'

const Promise = require('bluebird')
const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')

const { errorCode, errorUtils, passwordUtils } = coincidents.Utils
const { cacheManager } = coincidents.Managers
const { boom } = errorUtils

module.exports = (app) => {
  const updatePasswordRepository = app.src.repositories.profileUpdates.updatePasswordRepository

  const updatePassword = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers, dictionary)
    payload.userName = session.userName
    
    const cacheKey = `${payload.userName}'s WrongAttemptsNumbers`

    if (!passwordUtils.checkPasswordRestrict(payload.newPassword)) {
      throw boom('notAcceptable', dictionary.passwordAlert, errorCode.passwordAlert)
    }
    const cryptNewPasswordPromise = passwordUtils.cryptPassword(payload.newPassword)
    const cryptOldPasswordPromise = passwordUtils.cryptPassword(payload.oldPassword)

    return _checkWrongAttemptsNumbers(cacheKey)
      .then(() => Promise.all([cryptNewPasswordPromise, cryptOldPasswordPromise])
        .spread((newCryptedPassword, oldCryptedPassword) => {
          payload.newPassword = newCryptedPassword
          payload.oldPassword = oldCryptedPassword

          return updatePasswordRepository.updatePassword(payload, headers)
        }))
      .catch((err) => {
        switch (parseInt(err.message, 10)) {
          case errorUtils.userErrors.passwordInvalid:
            _setErrorTriedOnCache(cacheKey)
            throw boom('unauthorized', dictionary.invalidPassword, errorCode.invalidPassword)
          case errorUtils.userErrors.tooManyPasswordsWrong:
            throw boom('tooManyRequests', dictionary.tooManyInvalidPassword, errorCode.tooManyInvalidPassword)
          default:
            return boom('badData', err)
        }
      })

  }

  const _checkWrongAttemptsNumbers = (cacheKey) => {
    const MAXIMUM_NUMBER_ERRORS_IN_ONE_HOUR = 10

    return cacheManager.get(cacheKey)
      .then((cacheResponse) => {
        if (cacheResponse && cacheResponse.wrongAttempts > MAXIMUM_NUMBER_ERRORS_IN_ONE_HOUR) {
          throw new Error(errorUtils.userErrors.tooManyPasswordsWrong)
        }
      })
  }

  const _setErrorTriedOnCache = (cacheKey) => {
    const ONE_HOUR_IN_SECONDS = 3600
    cacheManager.get(cacheKey).then((cacheResponse) => {

      if (!cacheResponse) {
        const newWrongAttempt = {
          wrongAttempts: 1
        }

        return cacheManager.set(cacheKey, newWrongAttempt, ONE_HOUR_IN_SECONDS)
      }
      cacheResponse.wrongAttempts += 1

      return cacheManager.set(cacheKey, cacheResponse, ONE_HOUR_IN_SECONDS)
    })
  }

  return {
    updatePassword
  }
}