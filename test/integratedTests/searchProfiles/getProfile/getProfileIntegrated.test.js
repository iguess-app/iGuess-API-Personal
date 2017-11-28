'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/searchProfiles').getProfileSchemas.response
const getTokenWithSignInBeforeTests = require('../../lib/getTokenWithSignInBeforeTests')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils
let token = ''

lab.experiment('Integrated Test ==> Get Profile', () => {

  lab.before((done) => {
    getTokenWithSignInBeforeTests()
      .then((tokenResponse) => {
        token = tokenResponse
        done()
      })
  })

  lab.test('[IO] Get Profile - happyPath with userRef', (done) => {
    injectedRequests.happyPathWithUserRef.headers.token = token
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
    injectedRequests.happyPathWithUserName.headers.token = token
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
    injectedRequests.notFound.headers.token = token
    server.inject(injectedRequests.notFound)
      .then((response) => {
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

})