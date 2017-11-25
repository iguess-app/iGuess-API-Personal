'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../app').configServer
const schemaValidate = require('../../../src/routes/schemas/token/').tokenSchemas.response

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> Verify Token', () => {

  lab.test('[IO] Verify Token - happyPath', (done) => {
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        expect(result.valid).to.be.equal(false)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

})