'use Strict';

module.exports = (app) => {
  const Profile = app.src.schemas.profileSchema;
  const QueryUtils = app.src.utils.queryUtils;

  const search = (request) => {
    const searchField = request.searchField;

    return _searchUser(searchField)
  }

  const _searchUser = (searchField) => {

    const usrRegex = new RegExp(searchField);
    const searchQuery = {
      '_id': {
        '$regex': usrRegex,
        '$options': 'i'
      }
    }

    return Profile.find(searchQuery)
      .then((usersFound) =>
        usersFound.map((userFound) => QueryUtils.makeObject(userFound))
      )
      .catch((err) =>
        err
      )
  }


  return {
    search
  }
}