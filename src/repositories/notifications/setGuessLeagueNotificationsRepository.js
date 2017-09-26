'use strict'

const Boom = require('boom')
const Promise = require('bluebird')

module.exports = (app) => {
  const Notifications = app.src.models.notificationsModel
  const GUESSLEAGUE_TYPE = app.coincidents.Config.notificationTypes.guessLeagueRequest;

  const setGuessLeagueNotifications = (request, dictionary) => {

    const newGuessLineNotificationObj = {
      messageType: GUESSLEAGUE_TYPE,
      messageUserRef: request.invitatorUserRef,
      messageGuessLeagueRef: request._id,
      saw: false,
      championship: request.championship
    }

    const setNotificationsToInviteadsArrayPromise = request.inviteads.map((invitedUserRef) => {
      const searchQuery = {
        userRef: invitedUserRef
      }
      return Notifications.findOne(searchQuery)
        .then((userNotifications) => {
          _checkErrors(userNotifications, dictionary)
          userNotifications.notifications.unshift(newGuessLineNotificationObj)
          return userNotifications.save() 
        })
    })

    return Promise.each(setNotificationsToInviteadsArrayPromise, (justReturn) => justReturn)
  }

  return {
    setGuessLeagueNotifications
  }
}

const _checkErrors = (userNotifications, dictionary) => {
  if (!userNotifications) {
    throw Boom.notFound(dictionary.userNotFoundImpersonal)
  }
}