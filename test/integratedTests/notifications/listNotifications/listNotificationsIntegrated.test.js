'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/notifications').listNotificationSchemas.response
const getTokenWithSignInBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').getTokenWithSignInBeforeTests

const lab = exports.lab = Lab.script()
const expect = Lab.expect
let tokenUser = ''

lab.experiment('Integrated Test ==> List Notifications', () => {

  lab.before((done) => {
    getTokenWithSignInBeforeTests()
      .then((tokenSession) => {
        tokenUser = tokenSession
        done()
      })
  })

  /**
   * This test need to userRef: 591df6c78d1fdc0bb4eba371 to has at least one notification at DB to make sense
   */
  lab.test('[IO] List Notifications - happyPath', (done) => {
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
})