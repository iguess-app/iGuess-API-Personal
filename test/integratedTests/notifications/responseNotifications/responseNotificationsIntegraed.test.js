'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/notifications').responseNotificationSchemas.response
const recreateNotificationBeforeTest = require('./lib/recreateNotificationBeforeTest')

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils
let tokenUser = ''

lab.experiment('Integrated Test ==> Response Notifications', () => {
 
  /**
   *  To this tests go well is necessary addFriends service and listNotification working well
   *  To this tests go well the userName: userNotifi2 and userName: userNotifi must exist at DB
   */
  
   lab.beforeEach((done) => {
      recreateNotificationBeforeTest()
        .then((listAndToken) => {
          injectedRequests.happyPathTrue.payload.notificationId = listAndToken[0].result[0].notificationRef
          injectedRequests.happyPathFalse.payload.notificationId = listAndToken[0].result[0].notificationRef
          tokenUser = listAndToken[1]
          done()
        })
  })

  lab.test('[IO] Response Notifications - happyPath', (done) => {
    injectedRequests.happyPathTrue.headers.token = tokenUser
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
    injectedRequests.happyPathFalse.headers.token = tokenUser
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
    injectedRequests.notFoundNotification.headers.token = tokenUser    
    server.inject(injectedRequests.notFoundNotification)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        expect(result.message).to.be.equal(dictionary.notificationNotFound)
        expect(result.errorCode).to.be.equal(errorCode.notificationNotFound)
        done()
      })
  })
})