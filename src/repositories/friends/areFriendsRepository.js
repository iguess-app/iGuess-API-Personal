'use strict'

const coincidents = require('iguess-api-coincidents')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const areFriends = (request, dictionary) =>
    Profile.findById(request.userRef)
    .then((userFound) => {
      _checkErrors(userFound, dictionary)

      return {
        areFriends: userFound.friendList.includes(request.userRefFriend)
      }
    })

  return areFriends
}

const _checkErrors = (userFound, dictionary) => {
  if (!userFound) {
    throw boom('notFound', dictionary.userNotFoundImpersonal, errorCode.userNotFoundImpersonal)
  }
}