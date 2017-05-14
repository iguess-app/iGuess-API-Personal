'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const search = (request) => {
    const searchField = request.searchField;

    return _searchUser(searchField)
  }

  const _searchUser = (searchField) => {

    const usrRegex = new RegExp(searchField);
    const searchQuery = {
      'userName': {
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
      'supportedTeam': 0,
      'appreciatedTeams': 0,
      'confirmedEmail': 0,
      'invitedFriendList': 0,
      '__v': 0,
      'password': 0,
      'email': 0,
      '_id': 0
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