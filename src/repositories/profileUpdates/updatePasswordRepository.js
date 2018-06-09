'use strict'

const coincidents = require('iguess-api-coincidents')

const Profile = require('../../models/profileModel')()

const ErrorUtils = coincidents.Utils.errorUtils
const queryUtils = coincidents.Utils.queryUtils

module.exports = () => {

  const updatePassword = (payload) => {
    const searchQuery = _buildSearchQuery(payload)
    const updateQuery = {
      '$set': {
        password: payload.newPassword
      }
    }

    return Profile
      .findOne(searchQuery)
      .then((userFound) => {
        if (userFound && userFound.password !== payload.oldPassword && payload.updateByForgotService !== true) {
          throw new Error(ErrorUtils.userErrors.passwordInvalid)
        }

        return Profile
          .update(searchQuery, updateQuery)
          .then((queryResult) => {
            let modified = false
            if (queryResult.nModified) {
              modified = true
            }

            return {
              profileModified: modified
            }
          })
      })
  }

  return {
    updatePassword
  }
}

const _buildSearchQuery = (payload) => {
  const searchQuery = {}
  if (payload.userName) {
    searchQuery.userName = payload.userName
  }
  if (payload._id || payload.userRef) {
    searchQuery._id = queryUtils.makeObjectId(payload._id || payload.userRef)
  }
  
  return searchQuery
}