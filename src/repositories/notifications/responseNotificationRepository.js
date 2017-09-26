'use Strict';

const Promise = require('bluebird');

const inviteResponseRepository = require('../guess/inviteResponseRepository')

module.exports = (app) => {
  const Notifications = app.src.models.notificationsModel;
  const Profile = app.src.models.profileModel;
  const GuessesLeagues = app.src.models.guessesLeaguesSchema;
  const FRIENDSHIP_TYPE = app.coincidents.Config.notificationTypes.friendShipRequest;
  const GUESSLEAGUE_TYPE = app.coincidents.Config.notificationTypes.guessLeagueRequest;

  const responseNotification = (userResponse, dictionary) => {
    const searchQuery = {
      userRef: userResponse.userRef,
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
            responseObj.notificationRemoved = notificationRemoved
            responseObj.notificationDataSetted = notificationDataSetted

            return responseObj;
          })
      })
  }

  const _updateUsersInfos = (notification, userResponse) => {
    if (userResponse.accepted === true || FRIENDSHIP_TYPE != notification.messageType) {
      switch (notification.messageType) {
        case FRIENDSHIP_TYPE:
          return _findUserProfiles(notification.messageUserRef, userResponse.userRef)
            .spread((invitatorUser, invitedUser) => {
              _removeFromInvitedFriendList(notification.messageUserRef, userResponse.userRef)  

              return _updateFriendListsProfiles(invitatorUser, invitedUser)
            })
        case GUESSLEAGUE_TYPE:
          const requestObj = {
            userRef: userResponse.userRef,
            guessLeagueRef: notification.messageGuessLeagueRef,
            championshipRef: notification.championship.championshipRef,
            response: userResponse.accepted
          }
          return inviteResponseRepository.inviteReponse(requestObj)
            .then(() => userResponse.accepted)
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
      userRef: userResponse.userRef,
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

  return {
    responseNotification
  }
}