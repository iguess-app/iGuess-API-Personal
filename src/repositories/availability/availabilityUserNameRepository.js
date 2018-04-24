'use strict'

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const userNameAvailability = (request, dictionary) => {

    const searchQuery = {
      userName: request.userName
    }

    return Profile.findOne(searchQuery)
      .then((userFound) => {
        if (userFound) {
          return {
            available: false,
            alertMessage: dictionary.userNameAlreadyUsed
          }
        }

        return {
          available: true
        }
      })
  }

  return {
    userNameAvailability
  }
}