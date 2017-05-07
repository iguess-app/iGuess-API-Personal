'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const signInRepository = app.src.repositories.login.signInRepository;
  const notificationRepository = app.src.repositories.login.notificationRepository;
  const CacheManager = app.coincidents.Managers.cacheManager;

  const singIn = (query, headers) => signInRepository.singIn(query, headers)
    .then((singInObj) => Promise.all([singInObj, notificationRepository.getNotifications(singInObj.user.id)])
      .spread((userObj, notificationsObj) => {
        userObj.user.thereIsUnreadableNotification = notificationsObj.notifications.some((notification) => notification.saw === false)
        _setNotificationsOnCache(userObj.user.userName, notificationsObj)

        return userObj
      })
    )

  const _setNotificationsOnCache = (userName, notificationsObj) => {
    const notificationsCacheKey = `${userName}'s Notifications`
    CacheManager.set(notificationsCacheKey, notificationsObj)
  }

  return {
    singIn
  }
};