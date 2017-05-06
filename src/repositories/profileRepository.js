'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;

  const update = (dataToDB) =>
    _insertUserOnDB(dataToDB)

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

  return {
    update
  }
}