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

    const projectionQuery = {
      'friendList': 0,
      'description': 0,
      'notifications': 0,
      'guessesLines': 0,
      'guessesLeagues': 0,
      'teamsSupported': 0,
      '__v': 0,
      'password': 0,
      'email': 0
    }

    return Profile.find(searchQuery, projectionQuery)
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