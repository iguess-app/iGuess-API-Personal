'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const Notifications = app.coincidents.Schemas.notificationsSchema;
  const Profile = app.coincidents.Schemas.profileSchema;
  const GuessesLeagues = app.coincidents.Schemas.guessesLeaguesSchema;
  const FRIENDSHIP_TYPE = app.coincidents.Config.notificationTypes.friendShipRequest;
  const GUESSLEAGUE_TYPE = app.coincidents.Config.notificationTypes.guessLeagueRequest;

  const responseNotification = (userResponse) => {
    const searchQuery = {
      user: userResponse.userId,
      'notifications._id': userResponse.notificationId
    }

    return Notifications.findOne(searchQuery)
      .then((userNotifications) => {
        const responseObj = {
          notificationRemoved: false,
          notificationDataSetted: false
        }
        if (!userNotifications) {
          return responseObj
        }
        const notification = _getNotification(userNotifications.notifications, userResponse.notificationId)

        return Promise.all([_removeNotification(userResponse, searchQuery), _updateUsersInfos(notification, userResponse)])
          .spread((notificationRemoved, notificationDataSetted) => {
            _removeFromInvitedFriendList(notification.messageUserRef, userResponse.userId)
            responseObj.notificationRemoved = notificationRemoved
            responseObj.notificationDataSetted = notificationDataSetted

            return responseObj;
          })
      })
  }

  const _updateUsersInfos = (notification, userResponse) => {
    if (userResponse.accepted === true) {
      switch (notification.messageType) {
        case FRIENDSHIP_TYPE:
          return _findUserProfiles(notification.messageUserRef, userResponse.userId)
            .spread((invitatorUser, invitedUser) => _updateFriendListsProfiles(invitatorUser, invitedUser))
        case GUESSLEAGUE_TYPE:
          //TODO: return true for success and false to not modified
          _updatedGuessesLeagueProfile(notification.messageGuessLeagueRef, userResponse.userId)
          _updatedGuessLeague(notification.messageGuessLeagueRef, userResponse.userId)
          break
        default:
          throw Error('No notification type found')
      }
    }

    return false;
  }

  const _getNotification = (notifications, notificationId) =>
    notifications.find((notification) => notification.id === notificationId)

  const _removeNotification = (userResponse, searchQuery) => {
    const updateQuery = {
      user: userResponse.userId,
      '$pull': {
        'notifications': {
          '_id': userResponse.notificationId
        }
      }
    }
    const optionsQuery = {
      runValidators: true
    }

    return Notifications.update(searchQuery, updateQuery, optionsQuery)
      .then((removed) => {
        if (removed.nModified) {
          return true
        }

        return false
      })
  }

  const _removeFromInvitedFriendList = (invitatorUserId, invitedUserId) => {
    Profile.findById(invitatorUserId)
      .then((invitatorUser) => {
        const SPLICE_NUMBER = 1;
        const position = invitatorUser.invitedFriendList.indexOf(invitedUserId)
        invitatorUser.invitedFriendList.splice(position, SPLICE_NUMBER)
        invitatorUser.save();
      })
  }

  const _findUserProfiles = (invitatorUserId, invitedUserId) => {
    const invitatorUserPromise = Profile.findById(invitatorUserId)
    const invitedUserPromise = Profile.findById(invitedUserId)

    return Promise.all([invitatorUserPromise, invitedUserPromise])
  }

  const _updateFriendListsProfiles = (invitatorUser, invitedUser) => {
    invitatorUser.friendList.unshift(invitedUser.id)
    invitedUser.friendList.unshift(invitatorUser.id)

    return Promise.all([invitedUser.save(), invitatorUser.save()])
      .spread(() => true)
  }

  const _updatedGuessesLeagueProfile = (guessLeagueId, invitedUserId) => {
    Profile.findById(invitedUserId)
      .then((userFound) => {
        userFound.guessesLeagues.push(guessLeagueId)
        userFound.save()
      })
  }

  const _updatedGuessLeague = (guessLeagueId, invitedUserId) => {
    //TODO
    //GuessesLeagues
  }

  return {
    responseNotification
  }
}