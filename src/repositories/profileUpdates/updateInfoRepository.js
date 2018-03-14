'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const Profile = app.src.models.profileModel
  const ProfileUtils = app.coincidents.Utils.profileUtils
  const Errors = app.coincidents.Utils.errorUtils

  const updateInfo = (userData, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const updateObject = _buildUpdatedObject(userData, dictionary)

    const searchQuery = {
      'userName': userData.userName
    }
    const updateQuery = {
      '$set': updateObject
    }
    const optionsQuery = {
      runValidators: true
    }

    return Profile
      .update(searchQuery, updateQuery, optionsQuery)
      .then((queryResult) => {
        let modified = false
        if (queryResult.nModified) {
          modified = true
        }

        return {
          profileModified: modified,
          modifiedData: userData
        }
      })
      .catch((err) => {
        if (err.errors && err.errors.userName) {
          err.code = parseInt(err.errors.userName.message, 10)
        }
        if (err.errors && err.errors.name) {
          err.code = parseInt(err.errors.name.message, 10)
        }
        if (err.errors && err.errors.description) {
          err.code = parseInt(err.errors.description.message, 10)
        }

        return err
      })
  }

  const _buildUpdatedObject = (payload, dictionary) => {
    const updateObject = {}
    if (payload.name) {
      updateObject.name = payload.name
    }
    if (payload.description) {
      updateObject.description = payload.description
    }
    if (payload.newUserName) {
      updateObject.userName = payload.newUserName
    }
    if (payload.email) {
      if (ProfileUtils.isEmail(payload.email) === Errors.userErrors.notEmail) {
        throw Boom.notAcceptable(dictionary.notAEmail)
      }
      updateObject.email = payload.email
      updateObject.confirmedEmail = false
      //TODO: add flag to verify is email was really changed, if yes: call the code to send a confirmation email
    }

    return updateObject
  }

  return {
    updateInfo
  }
}

/*eslint max-statements: 0*/