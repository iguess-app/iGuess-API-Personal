'use strict'

const coincidents = require('iguess-api-coincidents')

const { errorCode, errorUtils, profileUtils } = coincidents.Utils
const { boom } = errorUtils

module.exports = (app) => {
  const availabilityEmailRepository = app.src.repositories.availability.availabilityEmailRepository

  const emailAvailability = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    if (profileUtils.isEmail(request.email) === errorUtils.userErrors.notEmail) {
      return Promise.reject(boom('notAcceptable', dictionary.notAEmail, errorCode.notAEmail))
    }

    return availabilityEmailRepository.emailAvailability(request, dictionary)
  }

  return {
    emailAvailability
  }
}