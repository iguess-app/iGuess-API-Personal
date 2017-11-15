'use strict'

module.exports = (app) => {
  const Profile = app.src.models.profileModel;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const getUserById = (userId) => {

    const searchQuery = {
      _id: userId
    }

    return Profile.findOne(searchQuery)
      .then((userFound) => QueryUtils.makeObject(userFound))
      .catch((err) => err)
  }


  return {
    getUserById
  }
}