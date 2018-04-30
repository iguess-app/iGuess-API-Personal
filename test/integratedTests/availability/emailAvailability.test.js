'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../app').configServer
const schemaValidate = require('../../../src/routes/schemas/availability').emailAvailabilitySchema.response

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils

lab.experiment('Integrated Test ==> email availability', () => {

  lab.test('[IO] email availability - happyPath Available', (done) => {
    server.inject(injectedRequests.emailHappyPathAvailable)
      .then((response) => {
        const result = response.result
        
        expect(result.available).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] email availability - happyPath unavailable', (done) => {
    server.inject(injectedRequests.emailHappyPathUnavailable)
      .then((response) => {
        const result = response.result
        expect(result.available).to.be.equal(false)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('email availability - not a email', (done) => {
    server.inject(injectedRequests.notEmail)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notAEmail)
        expect(result.errorCode).to.be.equal(errorCode.notAEmail)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })
})