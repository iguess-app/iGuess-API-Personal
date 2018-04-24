'use strict'

module.exports = (app) => {
  const availabilityUserNameRepository = app.src.repositories.availability.availabilityUserNameRepository

  const userNameAvailability = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    
    return availabilityUserNameRepository.userNameAvailability(request, dictionary)
  }

  return {
    userNameAvailability
  }
}