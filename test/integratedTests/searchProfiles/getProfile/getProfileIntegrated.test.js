'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/searchProfiles').getProfileSchemas.response

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils

lab.experiment('Integrated Test ==> Get Profile', () => {

  lab.test('[IO] Get Profile - happyPath with userRef', (done) => {
    server.inject(injectedRequests.happyPathWithUserRef)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Get Profile - happyPath with userName', (done) => {
    server.inject(injectedRequests.happyPathWithUserName)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Get Profile - not found', (done) => {
    server.inject(injectedRequests.notFound)
      .then((response) => {
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

})