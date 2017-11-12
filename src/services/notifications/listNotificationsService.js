'use strict'

const Boom = require('boom');
const Promise = require('bluebird')

module.exports = (app) => {
  const listNotificationsRepository = app.src.repositories.notifications.listNotificationsRepository;
  const getUserByIdRepository = app.src.repositories.getById.getUserByIdRepository;
  const FRIENDSHIP_TYPE = app.coincidents.Config.notificationTypes.friendShipRequest;
  const GUESSLEAGUE_TYPE = app.coincidents.Config.notificationTypes.guessLeagueRequest;

  const listNotifications = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    const userRef = request.userRef;

    return listNotificationsRepository.getNotifications(userRef, headers)
      .then((listOfNotifications) => {
        if (!listOfNotifications) {
          return [];
        }
        const notificationsPromisesArray = listOfNotifications.notifications.map((notification) =>
          _getNotificationFullMessage(notification, dictionary))

        return Promise.map(notificationsPromisesArray, (fullTextMessage) => fullTextMessage)

      })
  }
  const _getNotificationFullMessage = (notification, dictionary) => {
    switch (notification.messageType) {
      case FRIENDSHIP_TYPE:
        return _buildFriendshipReqText(notification, dictionary.friendshipRequest)
      case GUESSLEAGUE_TYPE:
        return _buildGuessLeagueReqText(notification, dictionary.guessLeagueRequest)
      default:
        throw Boom.notImplemented();
    }
  }

  const _buildGuessLeagueReqText = (notification, message) => {
    const getUserPromise = getUserByIdRepository.getUserById(notification.messageUserRef);

    const championshipHumanName = `${notification.championship.championship} ${notification.championship.season}`

    return Promise.all([getUserPromise, notification.id])
      .spread((userData, notificationId) => ({
          message: message.replace('{{userName}}', userData.userName).replace('{{championshipName}}', championshipHumanName),
          profile: userData.userName,
          avatar: userData.avatar,
          notificationId
        }))
  }

  const _buildFriendshipReqText = (notification, message) => 
   Promise.all([getUserByIdRepository.getUserById(notification.messageUserRef), notification.id])
    .spread((userData, notificationId) => ({
        message: message.replace('{{userName}}', userData.userName),
        profile: userData.userName,
        avatar: userData.avatar,
        notificationId
      }))

  return {
    listNotifications
  }
};