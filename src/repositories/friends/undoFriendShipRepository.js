'use Strict';

const Promise = require('bluebird')
const Boom = require('boom')

const SPLICE_NUMBER = 1;
const NOT_FOUND_FRIEND = -1;

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;

  const undoFriendship = (request, dictionary) => {

    const getUserNamePromise = _getUser(request.userName, dictionary);
    const getFriendUserNamePromise = _getUser(request.friendUserName, dictionary);

    return Promise.all([getUserNamePromise, getFriendUserNamePromise])
      .spread((userName, friendUserName) => _updateUsersProfiles(userName, friendUserName, dictionary))
  }

  const _getUser = (userName, dictionary) =>
    Profile.findOne({
      userName
    }).then((user) => {
      if (!user) {
        const errMsg = dictionary.userNotFound.replace('{{userName}}', userName)
        throw Boom.notFound(errMsg)
      }

      return user;
    })

  const _updateUsersProfiles = (userName, friendUserName, dictionary) => {
    const userPosition = userName.friendList.indexOf(friendUserName.id)
    const friendPosition = friendUserName.friendList.indexOf(userName.id)

    if (userPosition === NOT_FOUND_FRIEND && friendPosition === NOT_FOUND_FRIEND) {
      throw Boom.badRequest(dictionary.notFriends)
    }

    userName.friendList.splice(userPosition, SPLICE_NUMBER)
    userName.save();

    friendUserName.friendList.splice(userPosition, SPLICE_NUMBER)
    friendUserName.save();

    return {
      friendshipUndone: true
    }
  }

  return {
    undoFriendship
  }

}