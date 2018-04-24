'use strict'

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const emailAvailability = (request, dictionary) => {

    const searchQuery = {
      email: request.email
    }

    return Profile.findOne(searchQuery)
      .then((userFound) => {
        if (userFound) {
          return {
            available: false,
            alertMessage: dictionary.emailAlreadyUsed
          }
        }

        return {
          available: true
        }
      })
  }

  return {
    emailAvailability
  }
}