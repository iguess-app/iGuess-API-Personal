'use strict'

const Promise = require('bluebird')
const coincidents = require('iguess-api-coincidents')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const SPLICE_NUMBER = 1
const NOT_FOUND_FRIEND = -1

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const undoFriendship = (request, dictionary) => {

    const getUserNamePromise = _getUser(request.userName, dictionary)
    const getFriendUserNamePromise = _getUser(request.friendUserName, dictionary)

    return Promise.all([getUserNamePromise, getFriendUserNamePromise])
      .spread((userName, friendUserName) => _updateUsersProfiles(userName, friendUserName, dictionary))
      .then(() => _returnSuccess())
  }

  const _getUser = (userName, dictionary) =>
    Profile.findOne({
      userName
    }).then((user) => {
      if (!user) {
        const errMsg = dictionary.userNotFound.replace('{{userName}}', userName)
        throw boom('notFound', errMsg, errorCode.userNotFound)
      }

      return user
    })

  const _updateUsersProfiles = (userName, friendUserName, dictionary) => {
    const userPosition = userName.friendList.indexOf(friendUserName.id)
    const friendPosition = friendUserName.friendList.indexOf(userName.id)

    if (userPosition === NOT_FOUND_FRIEND && friendPosition === NOT_FOUND_FRIEND) {
      throw boom('badRequest', dictionary.notFriends, errorCode.notFriends)
    }

    userName.friendList.splice(userPosition, SPLICE_NUMBER)
    friendUserName.friendList.splice(userPosition, SPLICE_NUMBER)
    
    return Promise.all([
      friendUserName.save(),
      userName.save()
    ])
  }

  const _returnSuccess = () => ({
    friendshipUndone: true
  })

  return {
    undoFriendship
  }

}