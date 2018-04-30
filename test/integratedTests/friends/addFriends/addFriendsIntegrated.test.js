'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/friends/').addFriendsSchemas.response
const undoFriendShipBeforeTests = require('./lib/undoFriendShipBeforeTests')
const signInAddFriendsBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').signInAddFriendsBeforeTests

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils
let tokenUser = ''

lab.experiment('Integrated Test ==> Add Friends', () => {

  lab.before((done) => {
    signInAddFriendsBeforeTests()
      .then((tokenSession) => tokenUser = tokenSession)
      .then(() => undoFriendShipBeforeTests())
      .then(() => done())
  })

  /**
   * This tests need to userName: tioValmir and userName: gabrielJesus be at DB
   */
  lab.test('[MONGO] [REDIS] Add Friends - happyPath', (done) => {
    injectedRequests.happyPath.headers.token = tokenUser
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

   lab.test('[MONGO] [REDIS] Add Friends - user Not Found', (done) => {
    injectedRequests.userNotFound.headers.token = tokenUser
    server.inject(injectedRequests.userNotFound)
      .then((response) => {
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

  lab.test('[MONGO] [REDIS] Add Friends - notification already sent', (done) => {
    injectedRequests.notificationAlreadySent.headers.token = tokenUser
    server.inject(injectedRequests.notificationAlreadySent)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notificationExists)
        expect(result.errorCode).to.be.equal(errorCode.notificationExists)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  }) 

})

/*eslint no-return-assign: 0 */