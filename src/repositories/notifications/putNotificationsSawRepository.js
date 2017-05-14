'use Strict';

module.exports = (app) => {
  const Notifications = app.coincidents.Schemas.notificationsSchema;

  const putNotificationsSaw = (user) => {

    const searchQuery = {
      user: user.userId,
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