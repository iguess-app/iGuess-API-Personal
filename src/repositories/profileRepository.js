'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;
  const ErrorUtils = app.coincidents.Utils.errorUtils;

  const update = (dataToDB) => _insertUserOnDB(dataToDB)

  const _insertUserOnDB = (userData) => {
    const searchQuery = {
      'userName': userData.userName
    };
    const updateQuery = {
      '$set': {
        //TODO Insert here the update fields
      }
    }

    return Profile
      .update(searchQuery, updateQuery)
      .then((queryResult) => {
        if (queryResult.nModified) {
          return true;
        }

        return false;
      })
      .catch((err) => err)
  }

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
        if (userFound.newPassword !== payload.oldPassword) {
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
    update,
    updatePassword
  }
}