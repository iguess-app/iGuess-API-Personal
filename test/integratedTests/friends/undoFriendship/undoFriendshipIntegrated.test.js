'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/friends/').undoFriendshipSchemas.response
const doAFriendshipBeforeTests = require('./lib/doAFriendshipBeforeTests')
const getTokenWithSignInBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').getTokenWithSignInBeforeTests

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils
let tokenUser = ''

lab.experiment('Integrated Test ==> Undo Friendship', () => {

  lab.before((done) => {
    
    doAFriendshipBeforeTests()
      .then(() => getTokenWithSignInBeforeTests())
      .then((tokenSession) => {
        tokenUser = tokenSession
        done()
      })
  })

  /**
   * This test need to userName: sergioRamos and userName: fernandoTorres friends
   */
  lab.test('[IO] Undo Friendship - happyPath', (done) => {
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

  /**
   * This test need to userName: sergioRamos and userName: messi not friends
   */
  lab.test('[IO] Undo Friendship - users Not Friends', (done) => {
    injectedRequests.usersNotFriends.headers.token = tokenUser
    server.inject(injectedRequests.usersNotFriends)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notFriends)
        expect(result.errorCode).to.be.equal(errorCode.notFriends)
        expect(response.statusCode).to.be.equal(statusCode.badRequest)
        done()
      })
  })
})