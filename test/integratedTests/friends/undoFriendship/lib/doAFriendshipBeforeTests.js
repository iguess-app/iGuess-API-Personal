'use strict'

const app = require('../../../../../app')
const Profile = require('../../../../../src/models/profileModel')(app)
const injectedRequests = require('../injectedRequests')

const beforeTests = () =>
  _getUserProfiles()
    .then((users) => _reDoTheFriendship(users))


const _getUserProfiles = () => {
  const invitatorProfile = _getProfile('sergioRamos')
  const invitedProfile = _getProfile(injectedRequests.happyPath.payload.friendUserName)

  return Promise.all([invitatorProfile, invitedProfile])
}

const _getProfile = (userName) => {
  const searchQuery = { userName }

  return Profile.findOne(searchQuery)
}

const _reDoTheFriendship = (users) => {
  const userProfile = users[0]
  const friendProfile = users[1]
  
  const userIndex = userProfile.friendList.indexOf(friendProfile.id)
  if (userIndex === -1) {
    userProfile.friendList.push(friendProfile.id)
  }
  
  const friendIndex = friendProfile.friendList.indexOf(userProfile.id)
  if (friendIndex === -1) {
    friendProfile.friendList.push(userProfile.id)
  }

  return Promise.all([
    userProfile.save(),
    friendProfile.save()
  ])
}

module.exports = beforeTests