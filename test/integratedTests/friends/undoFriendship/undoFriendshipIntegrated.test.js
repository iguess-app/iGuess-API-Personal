'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/friends/').undoFriendshipSchemas.response
const doAFriendshipBeforeTests = require('./lib/doAFriendshipBeforeTests')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils

lab.experiment('Integrated Test ==> Undo Friendship', () => {

  lab.before((done) => {
    doAFriendshipBeforeTests()
      .then(() => done())
  })

  /**
   * This test need to userName: xavi and userName: sergioRamos friends
   */
  lab.test('[IO] Undo Friendship - happyPath', (done) => {
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  /**
   * This test need to userName: xavi and userName: sergioRamos not friends
   */
  lab.test('[IO] Undo Friendship - users Not Friends', (done) => {
    server.inject(injectedRequests.usersNotFriends)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notFriends)
        expect(response.statusCode).to.be.equal(statusCode.badRequest)
        done()
      })
  })
})