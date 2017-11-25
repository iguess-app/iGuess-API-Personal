'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/searchProfiles').searchProfilesSchema.response

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> Search Profile', () => {

  lab.test('[IO] Search Profile - happyPath', (done) => {
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