'use strict'

module.exports = (app) => {
  const Profile = app.src.models.profileModel
  const ErrorUtils = app.coincidents.Utils.errorUtils

  const updatePassword = (payload) => {
    const searchQuery = {
      userName: payload.userName
    }
    const updateQuery = {
      '$set': {
        password: payload.newPassword
      }
    }

    return Profile
      .findOne(searchQuery)
      .then((userFound) => {
        if (userFound && userFound.password !== payload.oldPassword) {
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