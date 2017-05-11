'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const getUserById = (userId) => {

    const searchQuery = {
      '_id': userId
    }

    return Profile.findOne(searchQuery)
      .then((userFound) => QueryUtils.makeObject(userFound))
      .catch((err) => err)
  }


  return {
    getUserById
  }
}