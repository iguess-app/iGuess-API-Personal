'use strict'

const app = require('../../../../../app')
const injectedRequests = require('../injectedRequests')
const Notifications = app.src.models.notificationsModel

const beforeTests = () => {
  const searchQuery = {
    userRef: injectedRequests.happyPath.payload.userRef
  }

  return Notifications.findOne(searchQuery)
    .then((notificationsFound) => {
      notificationsFound.notifications.map((notification) => {
        notification.saw = false

        return notification
      })

      return notificationsFound.save()
    })
}

module.exports = beforeTests