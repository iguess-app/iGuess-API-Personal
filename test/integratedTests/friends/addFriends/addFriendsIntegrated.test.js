'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/friends/').addFriendsSchemas.response
const undoFriendShipBeforeTests = require('./lib/undoFriendShipBeforeTests')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils

lab.experiment('Integrated Test ==> Add Friends', () => {

  lab.before((done) => {
    undoFriendShipBeforeTests()
      .then(() => done())
  })

  /**
   * This tests need to userName: tioValmir and userName: gabrielJesus be at DB
   */
  lab.test('[IO] Add Friends - happyPath', (done) => {
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

   lab.test('[IO] Add Friends - user Not Found', (done) => {
    server.inject(injectedRequests.userNotFound)
      .then((response) => {
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

  lab.test('[IO] Add Friends - notification already sent', (done) => {
    server.inject(injectedRequests.notificationAlreadySent)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notificationExists)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  }) 

  /**
   * This test need to userName: sergioRamos and userName: cristianoRonaldo to be friends at DB
   */
  lab.test('[IO] Add Friends - already friends', (done) => {
    server.inject(injectedRequests.alreadyFriends)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.alreadyFriends)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  }) 
})