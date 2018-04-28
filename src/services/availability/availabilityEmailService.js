'use strict'

const coincidents = require('iguess-api-coincidents')

const errorCode = coincidents.Utils.errorCodeUtils
const boom = coincidents.Utils.errorUtils.boom

module.exports = (app) => {
  const availabilityEmailRepository = app.src.repositories.availability.availabilityEmailRepository
  const ProfileUtils = app.coincidents.Utils.profileUtils
  const Errors = app.coincidents.Utils.errorUtils

  const emailAvailability = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    if (ProfileUtils.isEmail(request.email) === Errors.userErrors.notEmail) {
      return Promise.reject(boom('notAcceptable', dictionary.notAEmail, errorCode.notAEmail))
    }

    return availabilityEmailRepository.emailAvailability(request, dictionary)
  }

  return {
    emailAvailability
  }
}