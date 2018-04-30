'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/login').signInSchemas.response

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils

lab.experiment('Integrated Test ==> Sign In', () => {

  lab.test('[IO] Sign In - happyPath login With Email', (done) => {
    server.inject(injectedRequests.loginWithEmail)
      .then((response) => {
        const result = response.result
        
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Sign In - happyPath login With UserName', (done) => {
    server.inject(injectedRequests.loginWithUserName)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Sign In - invalid Login', (done) => {
    server.inject(injectedRequests.invalidLogin)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.invalidLogin)
        expect(result.errorCode).to.be.equal(errorCode.invalidLogin)
        expect(response.statusCode).to.be.equal(statusCode.unauthorized)
        done()
      })
  })

})