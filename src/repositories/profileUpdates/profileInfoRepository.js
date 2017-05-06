'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;

  const updateInfo = (userData) => {
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