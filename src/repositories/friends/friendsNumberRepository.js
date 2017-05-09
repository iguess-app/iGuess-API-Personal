'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;

  const getNumberOfFriends = (userName) => {

    const searchQuery = {
      userName
    }

    const projectionQuery = {
      'friendList': 1,
      '_id': 0
    }

    return Profile.findOne(searchQuery, projectionQuery)
      .then((user) => user.friendList.length)
      .catch((err) => err)
  }

  return {
    getNumberOfFriends
  }
}