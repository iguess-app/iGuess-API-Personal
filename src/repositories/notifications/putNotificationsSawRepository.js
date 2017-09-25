'use Strict';

module.exports = (app) => {
  const Notifications = app.src.models.notificationsModel;

  const putNotificationsSaw = (user) => {

    const searchQuery = {
      userRef: user.userRef,
      'notifications.saw': false
    }

    return Notifications.findOne(searchQuery)
      .then((userNotifications) => _setAllNotificationsSaw(userNotifications))
      .catch((err) => err)
  }

  const _setAllNotificationsSaw = (userNotifications) => {
    const responseObj = {
      profileModified: false
    }
    if (!userNotifications) {
      return responseObj
    }
    userNotifications.notifications.map((notification) => {
      notification.saw = true

      return notification
    })

    return userNotifications.save().then(() => {
      responseObj.profileModified = true;

      return responseObj
    })
    

  }

  return {
    putNotificationsSaw
  }
}