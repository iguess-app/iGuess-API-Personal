'use strict'

const app = require('../../../../../app')
const injectedRequests = require('../injectedRequests')
const Profile = require('../../../../../src/models/profileModel')(app)

const server = app.configServer

const beforeTests = () => 
  Promise.all([
    Profile.findById('5a189e22d7b55e03544887f5'),
    Profile.findById('5a189e34d7b55e03544887f8')
  ])
  .then((users) => {
    const userOne = users[0]
    const userTwo = users[1]
    _removeFromFriendList(userOne, userTwo._id)
    _removeFromFriendList(userTwo, userOne._id)
    
    Promise.all([
      userOne.save(),
      userTwo.save()
    ])
  })
  .then(() => server.inject(injectedRequests.sendNotificationBeforeTest))
  .then(() => server.inject(injectedRequests.listNotificationBeforeTest))


const _removeFromFriendList = (user, userFriendRef) => {
  const indexFriendList = user.friendList.indexOf(userFriendRef)
  if (indexFriendList >= 0) {
    user.friendList.splice(indexFriendList, 1)
  }
}

module.exports = beforeTests