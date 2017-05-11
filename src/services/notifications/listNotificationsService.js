'use Strict';

const Boom = require('boom');
const Promise = require('bluebird')

const FRIENDSHIP_TYPE = 1
const GUESSLEAGUE_TYPE = 2

module.exports = (app) => {
  const listNotificationsRepository = app.src.repositories.notifications.listNotificationsRepository;
  const getUserByIdRepository = app.src.repositories.getById.getUserByIdRepository;
  const getGuessLeagueByIdRepository = app.src.repositories.getById.getGuessLeagueByIdRepository;

  const listNotifications = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    const userName = request.userName;

    return listNotificationsRepository.getNotifications(userName, headers)
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
        return _buildFrienshipReqText(notification, dictionary.friendshipRequest)
      case GUESSLEAGUE_TYPE:
        return _buildGuessLeagueReqText(notification, dictionary.guessLeagueRequest)
      default:
        throw Boom.notImplemented();
    }
  }

  const _buildGuessLeagueReqText = (notification, message) => {
    const getUserPromise = getUserByIdRepository.getUserById(notification.messageUserRef);
    const getGuessLeaguePromise = getGuessLeagueByIdRepository.getGuessLeagueById(notification.messageGuessLeagueRef);

    return Promise.all([getUserPromise, getGuessLeaguePromise])
      .spread((userData, guessLeagueData) => ({
          message: message.replace('{{userName}}', userData.userName).replace('{{guessLeagueName}}', guessLeagueData.guessLeagueName),
          guessLeague: guessLeagueData.guessLeagueName,
          profile: userData.userName,
          avatar: userData.avatar
        }))
  }

  const _buildFrienshipReqText = (notification, message) => getUserByIdRepository.getUserById(notification.messageUserRef)
    .then((userData) => ({
        message: message.replace('{{userName}}', userData.userName).replace('{{leagueName}}'),
        profile: userData.userName,
        avatar: userData.avatar
      }))

  return {
    listNotifications
  }
};