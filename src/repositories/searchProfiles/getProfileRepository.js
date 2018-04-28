'use strict'

const coincidents = require('iguess-api-coincidents')
const Mongoose = require('mongoose')
const objectId = Mongoose.Types.ObjectId

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

module.exports = (app) => {
  const Profile = app.src.models.profileModel
  const QueryUtils = app.coincidents.Utils.queryUtils

  const getProfile = (payload, dictionary) => {

    const searchQuery = _buildSearchQuery(payload)

    return Profile
      .findOne(searchQuery)
      .then((userFound) => {
        if (!userFound) {
          const errMsg = dictionary.userNotFound.replace('{{userName}}', searchQuery.userName)
          throw boom('notFound', errMsg, errorCode.userNotFound)
        }

        return _buildProfileObject(QueryUtils.makeObject(userFound))
      })
  }

  const _buildProfileObject = (userFound) => {
    Reflect.set(userFound, 'userRef', userFound._id.toString())
    Reflect.set(userFound, 'numberOfFriends', userFound.friendList.length)
    Reflect.deleteProperty(userFound, '_id')
    Reflect.deleteProperty(userFound, 'friendList')
    Reflect.deleteProperty(userFound, 'invitedFriendList')
    Reflect.deleteProperty(userFound, 'password')
    Reflect.deleteProperty(userFound, 'confirmedEmail')

    return userFound
  }

  return {
    getProfile
  }
}


const _buildSearchQuery = (request) => {
  const searchQuery = {}

  if (request.userName) {
    searchQuery.userName = request.userName
  }
  if (request.userRef) {
    searchQuery._id = objectId(request.userRef)
  }

  return searchQuery
}