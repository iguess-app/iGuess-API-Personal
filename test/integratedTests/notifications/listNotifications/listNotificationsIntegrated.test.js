'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/notifications').listNotificationSchemas.response

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> List Notifications', () => {

  lab.test('[IO] List Notifications - happyPath', (done) => {
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