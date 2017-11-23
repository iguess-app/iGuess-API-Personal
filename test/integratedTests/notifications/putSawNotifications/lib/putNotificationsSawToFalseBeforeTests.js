'use strict'

const app = require('../../../../../app')
const injectedRequests = require('../injectedRequests')
const Notifications = require('../../../../../src/models/notificationsModel')(app)

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