'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/notifications').putNotificationsSawSchemas.response
const putNotificationsSawToFalseBeforeTests = require('./lib/putNotificationsSawToFalseBeforeTests')

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> Put Saw Notifications', () => {

  lab.before((done) => {
      putNotificationsSawToFalseBeforeTests()
      .then(() => done())
  })

  lab.test('[IO] Put Saw Notifications - happyPath (Modified = true)', (done) => {
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