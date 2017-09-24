'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const areFriends = (request, dictionary) => {

    return Profile.findById(request.userRef)
      .then((userFound) => {
        _checkErrors(userFound, dictionary)

        return {
          areFriends: userFound.friendList.includes(request.userRefFriend)
        }
      })
  }

  return areFriends
}

const _checkErrors = (userFound, dictionary) => {
  if (!userFound) {
    throw Boom.notFound(dictionary.userNotFoundImpersonal)
  }
}