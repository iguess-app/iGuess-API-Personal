'use strict'

const app = require('../../../../../app')
const Profile = require('../../../../../src/models/profileModel')(app)
const injectedRequest = require('../injectedRequests')

const beforeTest = () => 
  removeProfile()

const removeProfile = () => Profile.remove({userName: injectedRequest.happyPath.payload.userName})

module.exports = beforeTest