'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/notifications').putNotificationsSawSchemas.response
const putNotificationsSawToFalseBeforeTests = require('./lib/putNotificationsSawToFalseBeforeTests')
const getTokenWithSignInBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').getTokenWithSignInBeforeTests

const lab = exports.lab = Lab.script()
const expect = Lab.expect
let tokenUser = ''

lab.experiment('Integrated Test ==> Put Saw Notifications', () => {

  lab.before((done) => {
      putNotificationsSawToFalseBeforeTests()
        .then(() => getTokenWithSignInBeforeTests())
        .then((tokenSession) => {
          tokenUser = tokenSession
          done()
        })
  })

  lab.test('[IO] Put Saw Notifications - happyPath (Modified = true)', (done) => {
    injectedRequests.happyPath.headers.token = tokenUser
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        expect(result.profileModified).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Put Saw Notifications - happyPath (Modified = false)', (done) => {
    injectedRequests.happyPath.headers.token = tokenUser    
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        expect(result.profileModified).to.be.equal(false)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })
})