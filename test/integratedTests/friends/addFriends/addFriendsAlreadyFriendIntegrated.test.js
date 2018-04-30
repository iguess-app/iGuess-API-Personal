'use strict'

const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const getTokenWithSignInBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').getTokenWithSignInBeforeTests

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils
let tokenUser = ''

lab.experiment('Integrated Test ==> Add Friends (Already Friends Scenario)', () => {
  
  lab.before((done) => {
    getTokenWithSignInBeforeTests()
      .then((tokenSession) => {
        tokenUser = tokenSession
        done()
      })
  })
  
  /**
   * This test need to userName: sergioRamos and userName: cristianoRonaldo to be friends at DB
   */
  lab.test('[MONGO] [REDIS] Add Friends - already friends', (done) => {
    injectedRequests.alreadyFriends.headers.token = tokenUser
    server.inject(injectedRequests.alreadyFriends)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.alreadyFriends)
        expect(result.errorCode).to.be.equal(errorCode.alreadyFriends)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })
})