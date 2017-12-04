'use strict'

const injectedRequests = require('./injectedRequests')
const server = require('../../../app').configServer

const getTokenWithSignInBeforeTests = () => 
  server.inject(injectedRequests.loginWithEmail)
    .then((signInResponse) => signInResponse.result.token)

const signInProfileUpdateBeforeTests = () => 
  server.inject(injectedRequests.loginWithProfileToUpdate)
    .then((signInResponse) => signInResponse.result.token)

const signInAddFriendsBeforeTests = () => 
  server.inject(injectedRequests.loginWithTioValmir)
    .then((signInResponse) => signInResponse.result.token)

const signInAddFriendsToResponseNotificationBeforeTests = () => 
  server.inject(injectedRequests.loginWithuserNotifi)
    .then((signInResponse) => signInResponse.result.token)
  

module.exports = {
  getTokenWithSignInBeforeTests,
  signInProfileUpdateBeforeTests,
  signInAddFriendsBeforeTests,
  signInAddFriendsToResponseNotificationBeforeTests
}