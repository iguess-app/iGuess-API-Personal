'use strict'

const app = require('../../../../../app')
const injectedRequests = require('../injectedRequests')
const Profile = require('../../../../../src/models/profileModel')(app)
const signInAddFriendsToResponseNotificationBeforeTests = require('../../../lib/getTokenWithSignInBeforeTests').signInAddFriendsToResponseNotificationBeforeTests
const signInToResponseNotificationBeforeTests = require('../../../lib/getTokenWithSignInBeforeTests').signInToResponseNotificationBeforeTests

const server = app.configServer

const beforeTests = () => 
 Promise.all([
    Profile.findById('5a189e22d7b55e03544887f5'),
    Profile.findById('5a189e34d7b55e03544887f8'),
    signInAddFriendsToResponseNotificationBeforeTests()
  ])
  .then((promisesResponse) => {
    const userOne = promisesResponse[0]
    const userTwo = promisesResponse[1]
    injectedRequests.sendNotificationBeforeTest.headers.token = promisesResponse[2]
    
    _removeFromFriendList(userOne, userTwo._id)
    _removeFromFriendList(userTwo, userOne._id)

    Promise.all([
      userOne.save(),
      userTwo.save()
    ])
  })
  .then(() => server.inject(injectedRequests.sendNotificationBeforeTest))
  .then(() => signInToResponseNotificationBeforeTests())
  .then((token) => {
    injectedRequests.listNotificationBeforeTest.headers.token = token

    return Promise.all([
      server.inject(injectedRequests.listNotificationBeforeTest),
      token
    ])
  })

const _removeFromFriendList = (user, userFriendRef) => {
  const indexFriendList = user.friendList.indexOf(userFriendRef)
  if (indexFriendList >= 0) {
    user.friendList.splice(indexFriendList, 1)
  }
}

module.exports = beforeTests