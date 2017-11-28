'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/searchProfiles').searchProfilesSchema.response
const getTokenWithSignInBeforeTests = require('../../lib/getTokenWithSignInBeforeTests')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
let token = ''

lab.experiment('Integrated Test ==> Search Profile', () => {

  lab.before((done) => {
    getTokenWithSignInBeforeTests()
      .then((tokenResponse) => {
        token = tokenResponse
        done()
      })
  })

  lab.test('[IO] Search Profile - happyPath', (done) => {
    injectedRequests.happyPath.headers.token = token
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        result.forEach((element) => {
          expect(element.userName).to.contains(injectedRequests.searchField)
        })
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Search Profile - not found', (done) => {
    injectedRequests.notFound.headers.token = token
    server.inject(injectedRequests.notFound)
      .then((response) => {
        const result = response.result
        expect(result.length).to.be.equal(0)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

})