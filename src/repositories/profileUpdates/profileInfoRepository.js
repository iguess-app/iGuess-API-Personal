'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;
  const ProfileUtils = app.coincidents.Utils.profileUtils;
  const Errors = app.coincidents.Utils.errorUtils;

  const updateInfo = (userData, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    const updateObject = {};
    if (userData.name) {
      updateObject.name = userData.name;
    }
    if (userData.description) {
      updateObject.description = userData.description;
    }
    if (userData.newUserName) {
      updateObject.userName = userData.newUserName;
    }
    if (userData.email) {
      if (ProfileUtils.isEmail(userData.email) === Errors.userErrors.notEmail) {
        throw Boom.notAcceptable(`${dictionary.notAEmail}.`);
      }
      updateObject.email = userData.email;
      updateObject.confirmedEmail = updateObject.confirmedEmail;
      //TODO add flag to verify is email was really changed, if yes: call the code to send a confirmation email
    }

    const searchQuery = {
      'userName': userData.userName
    };
    const updateQuery = {
      '$set': updateObject
    }

    return Profile
      .update(searchQuery, updateQuery)
      .then((queryResult) => {
        let modified = false;
        if (queryResult.nModified) {
          modified = true;
        }

        return {
          profileModified: modified
        };
      })
      .catch((err) => err)
  }

  return {
    updateInfo
  }
}