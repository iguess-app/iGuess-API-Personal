'use strict'

const Promise = require('bluebird')
const coincidents = require('iguess-api-coincidents')
const sessionManager = require('../../managers/sessionManager')

const cacheManager = coincidents.Managers.cacheManager

module.exports = (app) => {
  const signInRepository = app.src.repositories.login.signInRepository;
  const listNotificationsRepository = app.src.repositories.notifications.listNotificationsRepository;
  const friendsNumberRepository = app.src.repositories.friends.friendsNumberRepository;

  const singIn = (query, headers) => signInRepository.singIn(query, headers)
    .then((singInObj) => {
      const notificationsPromise = listNotificationsRepository.getNotifications(singInObj.user.userRef)
      const friendListSizePromise = friendsNumberRepository.getNumberOfFriends(singInObj.user.userName)
      const createSessionPromise = sessionManager.createSession(singInObj)

      return Promise.all([singInObj, notificationsPromise, friendListSizePromise, createSessionPromise])
        .spread((userObj, notificationsObj, numberOfFriends) => {
          userObj.user.numberOfFriends = numberOfFriends;
          userObj.user.unreadableNotification = false;
          if (notificationsObj) {
            userObj.user.unreadableNotification = notificationsObj.notifications.some((notification) => notification.saw === false)
            _setNotificationsOnCache(userObj.user.userName, notificationsObj)
          }

          return userObj
        })
    })

  const _setNotificationsOnCache = (userName, notificationsObj) => {
    const ONE_MINUTE = 60;
    const notificationsCacheKey = `${userName}'s Notifications`
    cacheManager.set(notificationsCacheKey, notificationsObj, ONE_MINUTE)
  }

  return {
    singIn
  }
};