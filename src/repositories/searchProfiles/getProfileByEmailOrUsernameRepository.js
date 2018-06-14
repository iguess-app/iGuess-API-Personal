'use strict'

const coincidents = require('iguess-api-coincidents')

const { errorCode, errorUtils, queryUtils, profileUtils } = coincidents.Utils
const { boom } = errorUtils

const Profile = require('../../models/profileModel')()

const getProfile = (payload, dictionary) => {

  const searchQuery = _buildSearchQuery(payload)
  const projectionQuery = _buildProjectionQuery()

  return Profile
    .findOne(searchQuery, projectionQuery)
    .then((userFound) => {
      if (!userFound) {
        const errMsg = dictionary.userNotFound.replace('{{userName}}', searchQuery.userName)
        throw boom('notFound', errMsg, errorCode.userNotFound)
      }

      return queryUtils.makeObject(userFound)
    })
}

const _buildSearchQuery = (payload) => {
  const searchQuery = {}
  if (profileUtils.isEmail(payload.emailOrUsername) === true) {
    searchQuery.email = payload.emailOrUsername
  } else {
    searchQuery.userName = payload.emailOrUsername
  }

  return searchQuery
}

const _buildProjectionQuery = () => ({
  _id: 1,
  email: 1,
  name: 1,
  userName: 1
})

module.exports = () => getProfile