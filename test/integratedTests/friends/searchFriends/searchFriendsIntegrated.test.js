'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/friends/').searchFriendsSchemas.response
const getTokenWithSignInBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').getTokenWithSignInBeforeTests

const lab = exports.lab = Lab.script()
const expect = Lab.expect
let tokenUser = ''

lab.experiment('Integrated Test ==> Search Friends', () => {

  lab.before((done) => {
    getTokenWithSignInBeforeTests()
      .then((tokenSession) => {
        tokenUser = tokenSession
        done()
      })
  })

  /**
   * This test need to userName: sergioRamos and userName: neymarJr to be friends at DB
   */
  lab.test('[IO] Search Friends - happyPath', (done) => {
    injectedRequests.happyPath.headers.token = tokenUser
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        expect(JSON.stringify(result)).to.contains('ney')
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

})