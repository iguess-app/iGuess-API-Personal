'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/login').signUpSchemas.response
const deleteProfileBeforeTest = require('./lib/deleteProfileBeforeTest')

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils

lab.experiment('Integrated Test ==> Sign Up', () => {

  lab.before((done) => {
    deleteProfileBeforeTest()
      .then(() => done())
  })

  lab.test('[IO] Sign Up - happyPath', (done) => {
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  /**
   * This tests need to a email= mcRodolfinho@gmail.com already inserted at DB
   */
  lab.test('[IO] Sign Up - email Already in Use', (done) => {
    server.inject(injectedRequests.emailAlreadyExists)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.emailAlreadyUsed)
        expect(result.errorCode).to.be.equal(errorCode.emailAlreadyUsed)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

  /**
   * This tests need to a userName= mcRodolfinh already inserted at DB
   */
  lab.test('[IO] Sign Up - userName Already in Use', (done) => {
    server.inject(injectedRequests.userNameAlreadyExists)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.userNameAlreadyUsed)
        expect(result.errorCode).to.be.equal(errorCode.userNameAlreadyUsed)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

  lab.test('Sign Up - not a Email', (done) => {
    server.inject(injectedRequests.notAemail)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notAEmail)
        expect(result.errorCode).to.be.equal(errorCode.notAEmail)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

  
  lab.test('[IO] Sign Up - password Too Weak', (done) => {
    server.inject(injectedRequests.passwordTooWeak)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.passwordAlert)
        expect(result.errorCode).to.be.equal(errorCode.passwordAlert)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

})