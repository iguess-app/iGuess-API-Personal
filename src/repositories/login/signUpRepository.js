'use strict'

const { log, tokenManager } = require('iguess-api-coincidents').Managers

module.exports = (app) => {
  const Profile = app.src.models.profileModel
  const Notifications = app.src.models.notificationsModel
  const QueryUtils = app.coincidents.Utils.queryUtils

  const singUp = (dataToDB) =>
    _insertUserOnDB(dataToDB)

  const _insertUserOnDB = (userData) =>
    Profile.create(userData)
    .then((info) => {
      _createNotificationDocument(info)
      const token = tokenManager.generate()
      const user = _structureUserObj(QueryUtils.makeObject(info))

      return {
        token,
        user
      }
    })
    .catch((err) => {
      if (err.errors && err.errors.userName) {
        err.code = parseInt(err.errors.userName.message, 10)
      }
      if (err.errors && err.errors.name) {
        err.code = parseInt(err.errors.name.message, 10)
      }

      return err
    })

  const _structureUserObj = (user) => {
    Reflect.deleteProperty(user, 'password')
    Reflect.deleteProperty(user, 'friendList')
    Reflect.deleteProperty(user, 'invitedFriendList')
    Reflect.set(user, 'userRef', user._id.toString())
    Reflect.deleteProperty(user, '_id')

    return user
  }

  const _createNotificationDocument = (userData) => {
    const notificationObj = {
      userRef: userData.id,
      notifications: []
    }
    Notifications.create(notificationObj)
      .catch((err) => log.error(err))
  }

  return {
    singUp
  }
}