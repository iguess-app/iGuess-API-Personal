'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../app').configServer
const schemaValidate = require('../../../src/routes/schemas/availability').userNameAvailabilitySchema.response

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> userName availability', () => {

  lab.test('userName availability - happyPath Available', (done) => {
    server.inject(injectedRequests.userNamehappyPathAvailable)
      .then((response) => {
        const result = response.result
        
        expect(result.available).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('userName availability - happyPath unavailable', (done) => {
    server.inject(injectedRequests.userNamehappyPathUnavailable)
      .then((response) => {
        const result = response.result
        expect(result.available).to.be.equal(false)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })
})