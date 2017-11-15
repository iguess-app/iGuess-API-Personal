'use strict'

const app = require('../../../../../app')

const Profile = require('../../../../../src/models/profileModel')(app)
const Notifications = require('../../../../../src/models/notificationsModel')(app)
const injectedRequests = require('../injectedRequests')

const beforeTests = () =>
  _getUserProfiles()
    .then((users) => Promise.all([
      _deleteFromInvitedFriendList(users),
      _deleteFromFriendList(users),
      _deleteNotificationFromInvitedUser(users)])
    )

const _getUserProfiles = () => {
  const invitatorProfile = _getProfile(injectedRequests.happyPath.payload.userName)
  const invitedProfile = _getProfile(injectedRequests.happyPath.payload.invitedUserName)

  return Promise.all([invitatorProfile, invitedProfile])
}

const _getProfile = (userName) => {
  const searchQuery = { userName }

  return Profile.findOne(searchQuery)
}

const _deleteFromInvitedFriendList = (users) => {
  const invitatorUser = users[0]
  const index = invitatorUser.invitedFriendList.indexOf(users[1]._id)
  invitatorUser.invitedFriendList.splice(index, 1)

  return invitatorUser.save()
}

const _deleteFromFriendList = (users) => {
  const invitatorUser = users[0]
  const index = invitatorUser.friendList.indexOf(users[1]._id)
  if (index >= 0) {
    invitatorUser.friendList.splice(index, 1)
  }

  return invitatorUser.save()
}

const _deleteNotificationFromInvitedUser = (users) => {
  const searchQuery = {
    userRef: users[1]._id,
    'notifications.messageUserRef': users[0]._id
  }

  return Notifications.findOne(searchQuery)
    .then((userFound) => {
      if (userFound) {
        const index = userFound.notifications.findIndex((notification) => notification.messageUserRef === users[0].id)
        if (index >= 0) {
          userFound.notifications.splice(index, 1)
        }

        return userFound.save()
      }
    })
}

module.exports = beforeTests