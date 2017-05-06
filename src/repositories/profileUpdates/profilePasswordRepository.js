'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;
  const ErrorUtils = app.coincidents.Utils.errorUtils;

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
        if (userFound.password !== payload.oldPassword) {
          throw new Error(ErrorUtils.userErrors.passwordInvalid);
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
      })
  }

  return {
    updatePassword
  }
}