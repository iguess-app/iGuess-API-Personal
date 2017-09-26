'use Strict';

const Promise = require('bluebird')
const Boom = require('boom')

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
        _checkErrors(userNotifications, dictionary)

        const notification = _getNotification(userNotifications.notifications, userResponse.notificationId)

        return _updateUsersInfos(notification, userResponse)
        .then(() => _removeNotification(userResponse, searchQuery))
        .then((removeNotificationResponse) => {
          responseObj.notificationRemoved = removeNotificationResponse
          responseObj.notificationDataSetted = userResponse.accepted
          return responseObj
        })
      })
  }

  const _checkErrors = (userNotifications,dictionary) => {
    if (!userNotifications) {
      throw Boom.notFound(dictionary.notificationNotFound)
    }
  }

  const _updateUsersInfos = (notification, userResponse) => {
    if (notification.messageType === FRIENDSHIP_TYPE) {
      if (userResponse.accepted === true) {
        return _findUserProfiles(notification.messageUserRef, userResponse.userRef)
          .spread((invitatorUser, invitedUser) => {
            _removeFromInvitedFriendList(notification.messageUserRef, userResponse.userRef)

            return _updateFriendListsProfiles(invitatorUser, invitedUser)
          })
      }
      return Promise.resolve(false)
    }
    if (notification.messageType === GUESSLEAGUE_TYPE) {
      const requestObj = {
        userRef: userResponse.userRef,
        guessLeagueRef: notification.messageGuessLeagueRef,
        championshipRef: notification.championship.championshipRef,
        response: userResponse.accepted
      }
      return inviteResponseRepository.inviteReponse(requestObj)
    }
    throw Boom.notImplemented('No messageType found')
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