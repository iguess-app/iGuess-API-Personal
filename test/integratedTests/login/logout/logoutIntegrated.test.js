'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/login').logoutSchemas.response
const signInToDoLogoutBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').signInToDoLogout

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> Logout', () => {

  lab.before((done) => {
    signInToDoLogoutBeforeTests()
    .then((tokenSession) => {
      injectedRequests.login.headers.token = tokenSession
      done()
    })
  })

  lab.test('[IO - REDIS] Logout - happyPath logout', (done) => {
    server.inject(injectedRequests.login)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

})