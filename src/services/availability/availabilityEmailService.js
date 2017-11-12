'use strict'

const Boom = require('boom');

module.exports = (app) => {
  const availabilityEmailRepository = app.src.repositories.availability.availabilityEmailRepository;
  const ProfileUtils = app.coincidents.Utils.profileUtils;
  const Errors = app.coincidents.Utils.errorUtils;

  const emailAvailability = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    if (ProfileUtils.isEmail(request.email) === Errors.userErrors.notEmail) {
      return Promise.reject(Boom.notAcceptable(dictionary.notAEmail))
    }

    return availabilityEmailRepository.emailAvailability(request, headers)
  }

  return {
    emailAvailability
  }
};