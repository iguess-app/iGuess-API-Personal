'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/notifications').responseNotificationSchemas.response
const recreateNotificationBeforeTest = require('./lib/recreateNotificationBeforeTest')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils

lab.experiment('Integrated Test ==> Response Notifications', () => {

   lab.beforeEach((done) => {
      recreateNotificationBeforeTest()
        .then((list) => {
          injectedRequests.happyPathTrue.payload.notificationId = list.result[0].notificationRef
          injectedRequests.happyPathFalse.payload.notificationId = list.result[0].notificationRef
          done()
        })
  })
 
  lab.test('[IO] Response Notifications - happyPath', (done) => {
    server.inject(injectedRequests.happyPathTrue)
      .then((response) => {
        const result = response.result
        expect(result.notificationRemoved).to.be.equal(true)
        expect(result.notificationDataSetted).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Response Notifications - happyPath', (done) => {
    server.inject(injectedRequests.happyPathFalse)
      .then((response) => {
        const result = response.result
        expect(result.notificationRemoved).to.be.equal(true)
        expect(result.notificationDataSetted).to.be.equal(false)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Response Notifications - Not Found', (done) => {
    server.inject(injectedRequests.notFoundNotification)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        expect(result.message).to.be.equal(dictionary.notificationNotFound)
        done()
      })
  })
})