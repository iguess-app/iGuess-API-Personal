'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const signInRepository = app.src.repositories.login.signInRepository;
  const listNotificationsRepository = app.src.repositories.notifications.listNotificationsRepository;
  const friendsNumberRepository = app.src.repositories.friends.friendsNumberRepository;
  const CacheManager = app.coincidents.Managers.cacheManager;

  const singIn = (query, headers) => signInRepository.singIn(query, headers)
    .then((singInObj) => {
      const notificationsPromise = listNotificationsRepository.getNotifications(singInObj.user.id)
      const friendListSizePromise = friendsNumberRepository.getNumberOfFriends(singInObj.user.userName)

      return Promise.all([singInObj, notificationsPromise, friendListSizePromise])
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
    CacheManager.set(notificationsCacheKey, notificationsObj, ONE_MINUTE)
  }

  return {
    singIn
  }
};