'use Strict';

const Boom = require('boom')

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const getProfile = (payload, dictionary) => {

    const searchQuery = {
      userName: payload.userName
    };

    return Profile
      .findOne(searchQuery)
      .then((userFound) => {
        if (!userFound) {
          const errMsg = dictionary.userNotFound.replace('{{userName}}', searchQuery.userName)
          throw Boom.notFound(errMsg)
        }

        return _buildProfileObject(QueryUtils.makeObject(userFound))
      })
  }

  const _buildProfileObject = (userFound) => {
    Reflect.set(userFound, 'userId', userFound._id.toString())
    Reflect.set(userFound, 'numberOfFriends', userFound.friendList.length)
    Reflect.deleteProperty(userFound, '_id');
    Reflect.deleteProperty(userFound, 'friendList');
    Reflect.deleteProperty(userFound, 'invitedFriendList');
    Reflect.deleteProperty(userFound, 'password');
    Reflect.deleteProperty(userFound, '__v');
    Reflect.deleteProperty(userFound, 'confirmedEmail');

    return userFound
  }

  return {
    getProfile
  }
}