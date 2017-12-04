'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/friends/').areFriendsSchemas.response
const getTokenWithSignInBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').getTokenWithSignInBeforeTests

const lab = exports.lab = Lab.script()
const expect = Lab.expect
let tokenUser = ''

lab.experiment('Integrated Test ==> Are Friends', () => {
  
  lab.before((done) => {
    getTokenWithSignInBeforeTests()
      .then((tokenSession) => {
        tokenUser = tokenSession
        done()
      })
  })

  /**
   * This test need to userName: sergioRamos and userRef: 591e5bbba8634f1f9880e8aa friends
   */
  lab.test('[IO] Are Friends - happyPath (friends)', (done) => {
    injectedRequests.happyPathFriends.headers.token = tokenUser
    server.inject(injectedRequests.happyPathFriends)
      .then((response) => {
        const result = response.result
        expect(result.areFriends).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Are Friends - happyPath (not friends)', (done) => {
    injectedRequests.happyPathNotFriends.headers.token = tokenUser
    server.inject(injectedRequests.happyPathNotFriends)
      .then((response) => {
        const result = response.result
        expect(result.areFriends).to.be.equal(false)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })
})